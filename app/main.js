import * as net from "net";


console.log("Logs from your program will appear here!");


const server = net.createServer((socket) => {

    socket.on("data", (data) => {
        //get the user request and parse as string
        let request = data.toString();
        request = request.split('\r\n');

        //split the request by '\r\n' and get the first which is request line
        const requestLine = request[0];
        
        //then get the url from the request line
        const urlPath = requestLine.split(' ')[1];

        let response;
        //get the content from the url
        let str = urlPath.substring(6);

        //find the user-agent from the array request
        const agent = request.find((user) => {
            const user = user.startsWith('User-Agent');
        })

        const userAgent = agent.split(': ')[1];

        if (urlPath.startsWith('/echo/') || urlPath === '/') {
            response = '200 OK';
            socket._write(`HTTP/1.1 ${response}\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${str}`);
        } 
        else if (userAgent) {
            response = '200 OK';
            socket._write(`HTTP/1.1 ${response}\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n${userAgent}`);
        }
        else {
            response = '404 Not Found';
            socket._write(`HTTP/1.1 ${response}\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${str}`);
        }

        
    })
    

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");