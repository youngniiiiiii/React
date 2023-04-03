let http = require("http");

let server = http.createServer((request, response)=>{
            //브라우저  http://127.0.0.1:3000 서버로 액세스 요청이 들어오면
            //request 객체 - 브라우저에서 요청한 정보를 담아오는 객체
            //response 객체 - 서버에서 클라이언트로 정보를 보낼때 여기에 담아보낸다
            //
   
    response.writeHead(200, {'Content-Type' :'text/html;charset=utf-8'});
    response.end(`<H1>두번째서버</H2>`);   
})

server.listen(4000, ( )=>{
    console.log("server start http://127.0.0.1:4000");
});//1~1000까지는 쓰면 안되는 포트번호!
//1521 오라클
//3306 mysql

//npm install nodemon