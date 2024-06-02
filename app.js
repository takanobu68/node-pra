const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request, response) {
  const url_parts = url.parse(request.url, true);

  switch (url_parts.pathname) {
    case '/':
      response_index(request, response);
      break;
    case '/other':
      response_other(request, response);
      break;
    case './style.css':
      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.write(style_css);
      response.end();
      break;
    default:
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('no page...');
      break;
  }
}

function response_index(request, response) {
  const msg = 'これはIndexページです。';
  const content = ejs.render(index_page, {
    title: 'Index',
    content: msg,
  });
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.write(content);
  response.end();
}

function response_other(request, response) {
  let msg = 'これはOtherページです。';

  // Postアクセス処理
  if (request.method === 'POST') {
    let body = '';

    // データ受信のイベント
    request.on('data', (data) => {
      body += data;
    });

    // データ受信終了イベント処理
    request.on('end', () => {
      const post_data = qs.parse(body);
      msg += 'あなたは、「' + post_data.msg + '」と書きました。';
      const content = ejs.render(other_page, {
        title: 'Other',
        content: msg,
      });
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.write(content);
      response.end();
    });
  } else {
    msg = 'ぺーじがありません。';
    const content = ejs.render(other_page, {
      title: 'Other',
      content: msg,
    });
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(content);
    response.end();
  }
}
