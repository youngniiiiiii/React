var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

app.use(express.urlencoded({extended:false}));

app.get("/scoreform", (request, response)=>{
    fs.readFile("./html/scoreform.html", "utf-8", (err, data)=>{
        response.writeHead(200, {"Content-type":"text/html"});
        response.end(ejs.render(data));
    })
})

app.get("/result", (request, response)=>{

    let kor = parseInt(request.query.kor);
    let eng = parseInt(request.query.eng);
    let mat = parseInt(request.query.mat);
    response.send(`${request.query.name}의 총점은 ${kor+eng+mat}점이고 평균은 ${(kor+eng+mat)/3}점 입니다.`);
})



app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>")
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
});