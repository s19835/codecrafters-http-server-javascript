import * as net from "net";
import { join } from "path";
import { readFile, writeFile } from "fs";


console.log("Logs from your program will appear here!");


 //get the --directory path using process.argv
const path = process.argv.slice(2);

let directory;

//[ '--directory', '/tmp/data/codecrafters.io/http-server-tester/' ]
path.forEach((flag, index) => {
    if (flag === '--directory' && index + 1) {
        directory = path[index+1];
    }
});


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
        
        const requestMethod = requestLine.split(' ')[0];


        if (requestMethod === 'GET') {
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
            else if (urlPath.startsWith('/files')) {
                 //create the path with directory and urlPath
                const path = join(directory, urlPath.split('/')[2]);
                readFile(path, (err, data) => {
                    if (data) {
                        response = '200 OK';
                        socket._write(`HTTP/1.1 ${response}\r\nContent-Type: application/octet-stream\r\nContent-Length: ${data.length}\r\n\r\n${data}`);
                    }
                    else if (err) {
                        response = '404 Not Found';
                        socket._write(`HTTP/1.1 ${response}\r\n\r\n`);
                    }
                });
                //HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: 14\r\n\r\nHello, World!
            }
            else {
                response = '404 Not Found';
                socket._write(`HTTP/1.1 ${response}\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${str}`);
            }
        }
        else if (requestMethod === 'POST') {
            //codes for POST requests
            
            const data = requestArray[5];
            const path = join(directory, urlPath.split('/')[2]);

            writeFile(path, data, (err) => {
                if (err) socket._write(`HTTP/1.1 404 Not Found\r\n\r\n`);
                else socket._write(`HTTP/1.1 201 Created\r\n\r\n`);
            })
        }
       
    })
    

    socket.on("close", () => {
        socket.end();
    });
});

server.listen(4221, "localhost");