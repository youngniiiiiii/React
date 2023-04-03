var express = require("express");
var app = express(); // 서버 만들었음
var ejs = require("ejs");
var fs = require("fs");

//app.set("view engine", ejs); //내부변수에 값을 설정한다
//미들웨어를 사용한다
//여태까지는 request 오면 값으로 response 해줬는데 response를 html로 해본거에용

app.use(express.urlencoded({extended:false}));

app.get("/", (request, response)=>{
  fs.readFile("html/index.html", "utf-8", (error, data)=>{
    response.send( data);
  })
});

app.use((request, response) => {
    response.writeHead(200, { "Content-type": "text/html" });
    response.end("<h1>Express</h1>");
  });
app.listen(4000, () => {
    console.log("server start http://127.0.0.1:4000");
  });

