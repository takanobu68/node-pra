const http = require('http')

const server = http.createServer(
    (require,response) =>{
        response.end('<html><body><h1>Hello</h1><p>Welcome to Node.js</p></body></html>')
    }
)

server.listen(3000)
