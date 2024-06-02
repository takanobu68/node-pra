const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const index_page = fs.readFileSync('./index.ejs', 'utf-8');

const server = http.createServer(getClient);

server.listen(3000);
console.log('Server start!');

function getClient(req, res) {
  const content = ejs.render(index_page, {
    title: 'Indexページ',
    content: 'これはテンプレートを使ったサンプルページです',
  });
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(content);
  res.end();
}
