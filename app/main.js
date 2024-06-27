import * as net from "net";


console.log("Logs from your program will appear here!");


const server = net.createServer((socket) => {

    socket.on("data", (data) => {
        const request = data.toString();
        const requestLine = request.split('\r\n')[0];
        const urlPath = requestLine.split(' ')[1];
        let response;
        let str = urlPath.split('/');
        if (urlPath.startsWith('/echo/')) {
            response = '200 OK';
        } else {
            response = '404 Not Found'
        }
        
        socket._write(`HTTP/1.1 ${response}\r\nContent-Type: text/plain\r\nContent-Length: ${str[1].length}\r\n\r\n${str[1]}`);
    })
    

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");