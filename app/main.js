import * as net from "net";


console.log("Logs from your program will appear here!");


const server = net.createServer((socket) => {

    socket.on("data", (data) => {
        if (data.includes('/')) socket._write("HTTP/1.1 200 OK\r\n\r\n");
        else { socket._write("HTTP/1.1 404 Not Found\r\n\r\n"); }
    })

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");