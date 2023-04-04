var express= require("express");
var app = express();


//http://127.0.0.1:4000/gugu?dan=4

// app.get("/gugu",(request, response)=>{

//     let dan = request.query.dan;
//     let result = "";
//     for(i=1; i<=9; i++){
//         result +=`${dan} * ${i} = ${dan*i}<br/>`;
//     }
//     console.log( result );
//     response.writeHead(200,{"content-type":"text/html"});
//     response.end(result);
//     response.end("hello");  //이미 데이터 보내기를 완료했기때문에 오류발생
// });

//http://127.0.0.1:4000/gugu/4

app.get("/gugu/:dan",(request, response)=>{
    let dan = request.params.dan;   //url에 따라서 : dan
    let result = "";
    for(i=1; i<=9; i++){
        result +=`${dan} * ${i} = ${dan*i}<br/>`;
    }
    console.log( result );
    response.writeHead(200,{"content-type":"text/html"});
    response.end( result );
    response.end("hello");  //이미 데이터 보내기를 완료했기때문에 오류발생
});
app.use((request, response)=>{
    //다른 url처리 없을때 처리한다
    
        response.writeHead(200,{"content-type":"text/html"});
        response.end("<h1>EXPRESS</h1>")
    
});
app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000")
});