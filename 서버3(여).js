let http = require("http");
let fs = require("fs");  //파일읽기
let url = require("url"); //url분석을 위한 라이블러

//http:127.0.0.1:4000?name=Harry&age=17 이렇게 보내보겠읍니다
let server = http.createServer((request, response)=> {
  //console.log(request);
  console.log(request.url);  //전송Url
  console.log(request.method);  //전송방식

  let rurl = request.url;
  let query = url.parse(rurl, true).query;  
  //string 분석 -> json객체로 전환
  //파싱한다
  console.log(query);

  if(query.name!="")
  {
    response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    response.end(`이름 : ${query.name}  나이 : ${query.age}`);  //저기 위에 Utf 8 안 쓴 상태로 한글 쓰면 깨집니다
  }
})

server.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
}); //1~1000까지는 쓰면 안되는 포트번호!
//1521 오라클
//3306 mysql

//npm install nodemon