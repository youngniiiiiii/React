var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

app.use(express.urlencoded({extended:false}));

app.get("/addform", (request, response)=>{
    fs.readFile("./html/addform.html", "utf-8", (err, data)=>{
        response.writeHead(200, {"Content-type":"text/html"});
        response.end(ejs.render(data));
    })
})

app.get("/add", (request, response)=>{
    // let x = request.query.xvalue;
    // let y = request.query.yvalue;
    // let z = parseInt(x) + parseInt(y); 
    // response.send(z.toString());

    //pasreInt해주고 `${x}+${y}=${x+y}`로 보내줘도 됨
    let x = parseInt(request.query.xvalue);
    let y = parseInt(request.query.yvalue);
    response.send(`${x}+${y}=${x+y}`);
})

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>")
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
});