import http from 'http';
import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import os from 'os';

const execFileAsync = promisify(execFile);
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT_DIR = 'D:\\om\\om-sites\\info-resume-social';
const PUBLIC_DIR = 'D:\\om\\om-sites\\omthakur\\public';

// MIME types for static server
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
};

async function main() {
  console.log('--- Starting Resume PDF Compiler ---');

  // 1. Create simple static server
  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/resume.html';
    const filePath = path.join(ROOT_DIR, reqPath);

    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      return res.end('Not found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  console.log(`Local HTTP server running at http://127.0.0.1:${port}`);

  // Create temporary user-data-dir for Chrome
  const tempUserDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-resume-'));

  try {
    const tasks = [
      {
        url: `http://127.0.0.1:${port}/resume.html`,
        outFile: path.join(ROOT_DIR, 'Om_Thakur_Resume_2Page.pdf'),
        expectedPages: 2,
      },
      {
        url: `http://127.0.0.1:${port}/resume.html`,
        outFile: path.join(ROOT_DIR, 'Om_Thakur_Resume.pdf'),
        expectedPages: 2,
      },
      {
        url: `http://127.0.0.1:${port}/resume-1page.html`,
        outFile: path.join(ROOT_DIR, 'Om_Thakur_Resume_1Page.pdf'),
        expectedPages: 1,
      },
      {
        url: `http://127.0.0.1:${port}/resume.html`,
        outFile: path.join(ROOT_DIR, 'Om_Thakur_Resume_original_2page.pdf'),
        expectedPages: 2,
      },
    ];

    for (const task of tasks) {
      console.log(`Compiling ${path.basename(task.outFile)} from ${task.url}...`);
      const args = [
        '--headless=new',
        `--user-data-dir=${tempUserDir}`,
        '--disable-gpu',
        '--no-pdf-header-footer',
        `--print-to-pdf=${task.outFile}`,
        task.url,
      ];

      await execFileAsync(CHROME_PATH, args);

      const stats = fs.statSync(task.outFile);
      const buf = fs.readFileSync(task.outFile);
      const str = buf.toString('latin1');
      const pageMatches = str.match(/\/Type\s*\/Page\b/g);
      const pageCount = pageMatches ? pageMatches.length : 0;

      console.log(`  -> Size: ${stats.size} bytes | Pages: ${pageCount} (expected ${task.expectedPages})`);
    }

    // Copy to omthakur/public
    console.log('\nCopying compiled PDFs to omthakur/public...');
    const filesToCopy = [
      'Om_Thakur_Resume.pdf',
      'Om_Thakur_Resume_2Page.pdf',
      'Om_Thakur_Resume_1Page.pdf',
    ];

    for (const f of filesToCopy) {
      const src = path.join(ROOT_DIR, f);
      const dest = path.join(PUBLIC_DIR, f);
      fs.copyFileSync(src, dest);
      console.log(`  Copied ${f} -> ${dest} (${fs.statSync(dest).size} bytes)`);
    }

    console.log('\nAll PDFs compiled and mirrored successfully!');
  } finally {
    server.close();
    try {
      fs.rmSync(tempUserDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

main().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
