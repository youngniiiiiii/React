var express= require("express");
var ejs = require("ejs");
var app = express();
app.set("view engine", ejs)
app.use(express.urlencoded({extended:false}));

let scoreData =[
    {id:1, name:"홍길동", kor:90, eng:80, mat:100}
];  //데이터로 사용한다

// url은 서버 전체에서 유일
app.get("/score/list",(req, res)=>{
    //views/score/score_list.ejs
    //express framework가 디자인파일들은 views 폴더에 놓기로 약속
    //response객체에 render라는 함수를 express가 추가
    //첫번째 매개변수 : html파일
    //두번째 매개변수 : 데이터를 JSON형태로 전달해야 한다
    //이 두개를 합해서 새로운 문서를 만들어 클라이언트로 전송한다
    res.render("score/score_list.ejs", {scoreList:scoreData})  //ejs엔진에서는 key값 scoreList로 받아들인다
});

app.get("/score/view/:id",(req, res)=>{
    let id = req.params.id;
    //filter 조건을 만족하는 모든 데이터셋(배열)
    //find 조건을 만족하는 첫번째 데이터만(배열 아님)
    let scoreItem = scoreData.find(score=>score.id==id);
    res.render("score/score_view.ejs", {score:scoreItem});
});

app.get("/score/write",(req, res)=>{
    res.render("score/score_write.ejs");
});

app.post("/score/save",(req, res)=>{
    let name = req.body.name;
    let kor = parseInt(req.body.kor);
    let eng = parseInt(req.body.eng);
    let mat = parseInt(req.body.mat);
    let id = 0;   //젤 마지막에 있는 데이터의 id+1을 해야한다
    id = scoreData[scoreData.length-1].id+1
    //JSON으로 데이터를 만들어서 배열에 추가한다
    let data = {id:id, name:name, kor:kor, eng:eng, mat:mat};
    scoreData.push( data );
    //redirect함수를 이용해서 /score/list를 호출해야 한다
    res.redirect("/score/list");
});


app.use("/",(request, response)=>{
    response.render("index.ejs")
});

app.use((request, response)=>{
    //다른 url처리 없을때 처리한다  
        response.writeHead(200,{"Content-type":"text/html"});
        response.end("<h1>404 Error</h1>")   
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000")
})