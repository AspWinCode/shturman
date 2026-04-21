const { createServer } = require('http');
const { createReadStream, existsSync, statSync } = require('fs');
const { join, extname } = require('path');

const PORT = process.env.PORT || 4500;
const DIST = join(__dirname, 'dist');

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

createServer((req, res) => {
  let filePath = join(DIST, req.url === '/' ? '/index.html' : req.url);

  // Try exact path first, then index.html for SPA routing
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(DIST, 'index.html');
  }

  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const ext = extname(filePath);
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200);
  createReadStream(filePath).pipe(res);
}).listen(PORT, () => {
  console.log(`TravelAI running at http://localhost:${PORT}`);
});
