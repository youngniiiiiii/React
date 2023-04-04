var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

app.use(express.urlencoded({extended:false}));

app.get("/calcform", (request, response)=>{
    fs.readFile("./html/calcform.html", "utf-8", (err, data)=>{
        response.writeHead(200, {"Content-type":"text/html"});
        response.end(ejs.render(data));
    })
})

app.get("/calc", (request, response)=>{
    let x = parseInt(request.query.x);
    let y = parseInt(request.query.y);
    let operator = parseInt(request.query.operator);
        if(operator=="1")
            response.send(`${x}+${y}=${x+y}`);
        else if(operator=="2")
            response.send(`${x}-${y}=${x-y}`);
        else if(operator=="3")
            response.send(`${x}*${y}=${x*y}`);
        else
            response.send(`${x}/${y}=${x/y}`);
});

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>")
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
});