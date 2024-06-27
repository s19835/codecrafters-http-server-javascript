import * as net from "net";


console.log("Logs from your program will appear here!");


const server = net.createServer((socket) => {

    socket.on("data", (data) => {
        const request = data.toString();
        const requestLine = request.split('\r\n')[0];
        const urlPath = requestLine.split(' ')[1];
        let response = (urlPath === '/') ? '200 OK' : '404 Not Found';
        socket._write(`HTTP/1.1 ${response}\r\n\r\n`);
    })
    

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");