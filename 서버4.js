let http = require("http");
let fs = require("fs");     //파일읽기
let url = require("url");   //url분석을 위한 라이블러

//http:127.0.0.1:3000/add?x=4&y=5
//http:127.0.0.1:3000/sub?x=4&y=5
//http:127.0.0.1:3000/userinfo?userid=test&username=Tom


let server = http.createServer((request, response)=>{
    //console.log( request );
    //console.log( request.url );     //전송url
    console.log( request.method );  //전송방식 : GET
    
    let rurl = request.url;
    let pathname = url.parse(rurl, true).pathname;  //add
    let query = url.parse(rurl, true).query;       //{x:4, y:5}
    //string 분석 -> json객체로 전환
    //파싱한다
    console.log( query );
    console.log( pathname );
    console.log( typeof(query) );
    
    if( pathname=="/add"){
        response.writeHead(404, {'Content-Type' :'text/html;charset=utf-8'});
        let x = parseInt(query.x);
        let y = parseInt(query.y);
        let z = x + y;
        response.end(` ${x} ${y} = ${z}`);
    }else if( pathname=="/sub"){
        response.writeHead(404, {'Content-Type' :'text/html;charset=utf-8'});
        let x = parseInt(query.x);
        let y = parseInt(query.y);
        let z = x - y;
        response.end(` ${x} ${y} = ${z}`);
    }else if(pathname=="/userinfo"){
    console.log(query.userid != "" & query.username != "" );

        response.writeHead(200, {'Content-Type' :'text/html;charset=utf-8'});
        response.end(`아이디 :${query.userid} 이름:${query.username}`);   
    }
    else{
        response.writeHead(404, {'Content-Type':'text/html;charset=utf-8'});
        response.end("<h1>존재하지 않는 url입니다</h1>");
    }
})

server.listen(3000, ( )=>{
    console.log("server start http://127.0.0.1:3000");
});