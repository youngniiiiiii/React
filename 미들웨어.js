var express= require("express");
var app = express();

//첫번째 미들웨어
app.use((request, response, next)=>{
    //request 브라우저 -> 서버
    //response 서버 -> 브라우저
    //next - 다음함수를 호출핟나
    request.name = "홍길동";
    response.name = "John"
    console.log("aaaaaaaaaaaa");
    next();
});

//두번째 미들웨어
app.use((request, response, next)=>{
    console.log("bbbbbbbbbbb");
    request.phone="010-2958-4929";
    response.address="서울시 영등포구"
    next();
});

app.use((request, response)=>{
    //다른 url처리 없을때 처리한다
        response.writeHead(200,{"content-type":"text/html;charset=utf-8"});
        console.log( request.name );
        console.log( response.name );
        console.log( request.phone );
        console.log( response.address );

        response.end(`<h1>${request.name}</h1>`)
});
                                                                                                                                                                                                                              
    console.log("server start http://127.0.0.1:4000")
