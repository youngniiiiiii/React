var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

app.use(express.urlencoded({extended:false}));

app.get("/guguform", (request, response)=>{
    fs.readFile("./html/guguform.html", "utf-8", (err, data)=>{
        response.writeHead(200, {"Content-type":"text/html"});
        response.end(ejs.render(data));
    })
})

app.get("/gugu", (request, response)=>{
    let dan = request.query.dan;
    let result = "";
    for(i=1; i<=9; i++)
        result +=`<p style="color:blue;font-size:14pt">${dan} * ${i} = ${dan*i}<br/>`; 
        response.send( result );
    
        
});

app.use((request, response)=>{
    //다른 url처리 없을때 처리한다
    
        response.writeHead(200,{"content-type":"text/html"});
        response.end("<h1>EXPRESS</h1>")
    
});
app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000")
});