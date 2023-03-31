let http = require("http");


let server = http.createServer((request, response)=>{
   
    response.writeHead(200, {'Content-Type' :'text/html;charset=utf-8'});
    response.end(`<H1>두번째서버</H2>`);   
})

server.listen(4000, ( )=>{
    console.log("server start http://127.0.0.1:4000");
});//1~1000까지는 쓰면 안되는 포트번호!
//1521 오라클
//3306 mysql

//npm install nodemon