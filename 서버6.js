let http = require("http");
let fs = require("fs");


let server = http.createServer((request, response)=>{
    
    fs.readFile("./html/index.html", (error, data)=>{
        if (error){
            
            response.writeHead(500, {'Content-Type' :'text/html;charset=utf-8'});
            response.end(`error`);   //오류상황임
            return;
        }
        response.writeHead(200, {'Content-Type' :'text/html;charset=utf-8'});
        response.end(data); //파일 내용을 브라우저로 보낸다  
    })
});

server.listen(4000, ( )=>{
    console.log("server start http://127.0.0.1:4000");
});