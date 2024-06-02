const http = require('http')

const server = http.createServer(
    (require,response) =>{
        response.end('Hello Nide.js')
    }
)

server.listen(3000)
