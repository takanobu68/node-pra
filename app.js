const http = require('http');
const fs = require('fs');

const server = http.createServer(getClient);

server.listen(3000);
console.log('Server start!');

function getClient(req, res) {
  fs.readFile('./index.html', 'utf-8', (error, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}
