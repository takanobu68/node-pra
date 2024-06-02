const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const other_page = fs.readFileSync('./other.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

const server = http.createServer(getClient);

server.listen(3000);
console.log('Server start!');

function getClient(req, res) {
  const url_parts = url.parse(req.url);
  switch (url_parts.pathname) {
    case '/':
      const content = ejs.render(index_page, {
        title: 'Indexページ',
        content: 'これはテンプレートを使ったサンプルページです',
      });
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(content);
      res.end();
      break;
    case '/other':
      const other_content = ejs.render(other_page, {
        title: 'Otherページ',
        content: 'これは新しく用意したページです',
      });
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(other_content);
      res.end();
      break;
    case './style.css':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(style_css);
      res.end();
      break;
    default:
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('no page...');
      break;
  }
}
