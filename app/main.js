import * as net from "net";


console.log("Logs from your program will appear here!");


const server = net.createServer((socket) => {

    socket.on("data", (data) => {
        const request = data.toString();
        const requestLine = request.split('\r\n')[0];
        const urlPath = requestLine.split(' ')[1];
        let response;
        let str = urlPath.substring(6);
        if (urlPath.startsWith('/echo/') || urlPath === '/') {
            response = '200 OK';
        } else {
            response = '404 Not Found';
        }
        
        socket._write(`HTTP/1.1 ${response}\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${str}`);
    })
    

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");