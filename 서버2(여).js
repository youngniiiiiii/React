let http = require("http");

let server = http.createServer((request, response)=> {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    response.end("<H1>두번째 서버입니다</H1>")  //여기 위에 Utf 8 안 쓴 상태로 한글 쓰면 깨집니다
})

server.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
}); //1~1000까지는 쓰면 안되는 포트번호!
//1521 오라클
//3306 mysql

//npm install nodemon