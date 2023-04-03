var express = require("express");
var app = express(); // 서버 만들었음


//add?x=45&y=7

// app.get("/add", (req, res)=>{
//     let x = parseInt(req.query.x)
//     let y = parseInt(req.query.y)
//     let result= x + y
//     res.send(result.toString());
// })

app.get("/add", (req, res)=>{
    x = req.query.x
    y = req.query.y
    z = parseInt(x) + parseInt(y);
    res.send({x:x ,y:y, z:z});
})


//add/45/7
// app.get("/add/:x/:y", (req, res) => {
//     console.log(req.params)//.name;
//     let x=parseInt(req.params.x) 
//     let y=parseInt(req.params.y)
//     let result= x + y;
//     res.send(result.toString());      //send함수를 이용해서 JSON데이터 송신
//   });

  app.get("/add/:x/:y", (req, res)=>{
    x = req.params.x
    y = req.params.y
    z = parseInt(x) + parseInt(y);
    res.send({x:x ,y:y, z:z});
})


app.listen(4000, () => {
    console.log("server start http://127.0.0.1:4000");
});

app.use((request, response) => {
    response.writeHead(200, { "Content-type": "text/html" });
    response.end("<h1>Express</h1>");
});