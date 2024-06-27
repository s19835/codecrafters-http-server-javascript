import * as net from "net";


console.log("Logs from your program will appear here!");


const server = net.createServer((socket) => {

    socket.on("data", (data) => {
        const request = data.toString();
        const urlPath = request.split('\r\n')[1];
        let response;
        if (urlPath === '/') response = '200 OK'
        else response = '404 Not Found';
        socket._write(`HTTP/1.1 ${response}\r\n\r\n`);
    })
    

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");