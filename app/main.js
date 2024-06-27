import * as net from "net";


console.log("Logs from your program will appear here!");


const server = net.createServer((socket) => {

    socket.on("data", (data) => {
        const request = data.toString();
        

        const requestArray = request.split('\r\n');
        const requestLine = requestArray[0];
        
        const userAgentArray = requestArray.find(header => header.toLowerCase().startsWith('user-agent'));
        let userAgent = userAgentArray ? userAgentArray.split(': ')[1] : '';

        const urlPath = requestLine.split(' ')[1];
        
        let response;
        let str = urlPath;
        str = urlPath.substring(6);
        
        if (urlPath.startsWith('/echo/')) {
            response = '200 OK';
            socket._write(`HTTP/1.1 ${response}\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${str}`);
        } 
        else if (urlPath === '/') {
            response = '200 OK';
            socket._write(`HTTP/1.1 ${response}\r\n\r\n`);
        }
        else if (urlPath === '/user-agent') {
            response = '200 OK';
            socket._write(`HTTP/1.1 ${response}\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`);
            
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