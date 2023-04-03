var express= require("express");
var app = express();

//get- get방식으로 온것만
//post- post 방식으로 온것만
//get -get방식으로 온것만
//post - post방식으로 온것만
app.use("/test",(request, response)=>{
//다른 url처리 없을때 처리한다

    response.writeHead(200,{"content-type":"text/html"});
    response.end("<h1>test</h1>")

});
app.use((request, response)=>{
    //다른 url처리 없을때 처리한다
    
        response.writeHead(200,{"content-type":"text/html"});
        response.end("<h1>EXPRESS</h1>")
    
    });

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000")
})