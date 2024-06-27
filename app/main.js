import * as net from "net";


console.log("Logs from your program will appear here!");


const server = net.createServer((socket) => {

    socket.on("data", (data) => {
        socket.on("data", (data) => {
            const request = data.toString();
            const requestLines = request.split('\r\n');
            const requestLine = requestLines[0];
            const headers = requestLines.slice(1, requestLines.indexOf(''));
            const urlPath = requestLine.split(' ')[1];
    
            let response;
            let responseBody;
            let statusCode;
    
            // Extract the User-Agent header
            const userAgentHeader = headers.find(header => header.toLowerCase().startsWith('user-agent:'));
            const userAgent = userAgentHeader ? userAgentHeader.split(': ')[1] : '';
    
            if (urlPath === '/user-agent') {
                statusCode = '200 OK';
                responseBody = userAgent;
            } else {
                statusCode = '404 Not Found';
                responseBody = 'Not Found';
            }
    
            const responseHeaders = `HTTP/1.1 ${statusCode}\r\n` +
                                    `Content-Type: text/plain\r\n` +
                                    `Content-Length: ${responseBody.length}\r\n` +
                                    `\r\n`;
    
            response = responseHeaders + responseBody;
    
            socket.write(response);
        });
    
        
    })
    

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");