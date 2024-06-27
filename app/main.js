import * as net from "net";


console.log("Logs from your program will appear here!");


const server = net.createServer((socket) => {

    socket.on("data", (data) => {
        const request = data.toString();
        const requestLine = request.split('\r\n')[0];
        const headerLine = request.split('\r\n')[1];
        const userAgent = headerLine.split('\r\n')[1];
        const urlPath = requestLine.split(' ')[1];
        let response;
        let str = urlPath.substring(6);
        if (urlPath.startsWith('/echo/') || urlPath === '/') {
            response = '200 OK';
        } else {
            response = '404 Not Found';
        }

        socket._write(`HTTP/1.1 ${response}\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${userAgent.substring(11)}`);
    })
    

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");