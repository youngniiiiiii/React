//rest_board.js
let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");
router.use(express.urlencoded({ extended: false }));

/* GET home page. */
//http://localhost:9090/rest_board/list     --X(안된다.)
//http://localhost:9090/rest_board/list/1   --O(된다.)
router.get("/list/:pg", async function (req, res, next) {
  let pg = parseInt(req.params.pg);

  let sql = `
              select count(*) cnt
              from tb_board A
              left outer join (select @rownum:=0) B on 1=1
              left outer join tb_member C ON A.writer=C.userid
            `; 
  let results = await commonDB.mysqlRead(sql, []);
  let totalCnt = results[0]["cnt"];

      sql = `
              SELECT A.id, A.title,A.writer,A.num, A.username, A.contents
                ,date_format(A.wdate, '%Y-%m-%d') wdate
                FROM
                (
                select A.id, A.title, A.writer, A.wdate, C.username, A.contents
                ,@rownum:=@rownum+1 num
                FROM tb_board A
                LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
                LEFT OUTER JOIN tb_member C ON A.writer=C.userid
                ORDER BY id DESC
                )A
                LIMIT ${(pg-1)*10}, 10
            `;

  results = await commonDB.mysqlRead(sql, []);
  res.json({
    boardList: results,
    totalCnt: totalCnt,
    pg: pg,
  }); // 하나의 함수 안에서 res.json 호출하고 다시 res.send나 render나 json 호출 못한다.
});

// router.get("/view/:id", async function (req, res, next) {
//   let id = req.params.id;
//   sql = `select id
//                ,title
//                ,writer
//                ,contents
//                ,date_format(wdate, '%Y-%m-%d') wdate
//          from tb_board
//          where id = ?`;
//   let results = await commonDB.mysqlRead(sql, [id]);
//   let boardItem = results.find((board) => board.id == id);
//   res.render("board/board_view", { boardItem: boardItem });
// });

router.post("/write", async function (req, res, next) {
  checkInfos=[
    {key:"title",type:"str", range:200},
    {key:"writer",type:"str", range:40},
    {key:"contents",type:"str", range:-1}
  ]
  //수행결과값이 0이면 문제 없는거고 다른 숫자가 온다 오류임
  insertInfo = commonUtil.checkInfo ( req, checkInfos );
  if( insertInfo["result"]!=0)
  {
    res.json({insertInfo});
    return;
  }

  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;

  let sql = `select count(*) cnt from tb_member where userid='${writer}'`;
  results = await commonDB.mysqlRead(sql, []);
  if(results[0]["cnt"]==0)
  {
    res.json({result:"fail", msg:"해당하는 아이디가 없습니다."});
    return;
  }


  sql = `insert into tb_board(title, writer, contents, wdate)
        values( '${title}', '${writer}', '${contents}', now())`;
        await commonDB.mysqlRead(sql, []);

  res.json({"result": "success"});
});

router.post("/save", async function (req, res, next) {
  //{title:"제목" , writer:"test", content:"내용"}
  //응답 성공시 result: "success", msg :"등록성공"
  //응답 실패시 result: "fail" , msg: "등록실패"

  try{
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;
  let params = [title, writer, contents];
  sql = `insert into tb_board(title, writer, contents, wdate)
         values(?,?,?,now())`;
  await commonDB.mysqlRead(sql, [title, writer, contents]);

  res.json({result:"success", msg:"등록성공"});

  }
  catch(e){
    res.json({result:"fail", msg:"등록실패"})
    return;
  }
});

router.get("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  let sql = `select A.id, A.title, A.writer, A.contents,
             date_format(A.wdate, '%Y-%m-%d') wdate,
             (select username from tb_member B where A.writer=B.userid) username
             from tb_board A
             where id=${id}`;

  let results = await commonDB.mysqlRead(sql,[]);
  if(results.length==0)
  {
    res.json({result:"fail", msg:"해당하는 데이터를 찾을 수 없습니다"})
    return;
  }
  // let title = req.body.title;
  // let writer = req.body.writer;
  // let contents = req.body.contents;

  // sql = `insert into tb_board(title, writer, contents, wdate)
  //       values( '${title}', '${writer}', '${contents}', now())`;
  //     await commonDB.mysqlRead(sql, []);
  
        res.json({result:"success", boardData:results[0]});
});

//subqeury: select(결과셋이 하나 또는 0일때 가능), from: 인라인뷰, where 절에 들어간당..
//조인 => 서브쿼리 => 함수
//nested loop join => for문 돌려서 조인을 한다. 10이전버전
//hash join => 양쪽 테이블의 join칼럼을 기준으로 해쉬테이블을 만들어 조인한다(엄청빠름)

//선형검색(n번비교), 이진검색(데이터가 순서대로 있을때), 해쉬검색(젤빠름)


module.exports = router;






// var express = require('express');
// var router = express.Router();
// var commonDB = require("./commonDB");
// let commonUtil = require("./commonUtil");

// /* GET home page. */
// router.get('/list/:pg', async function(req, res, next) {
//   let pg = parseInt(req.params.pg);
//   //pg=1 0~  (pg-1)*10  0
//   //pg=2 10~  (2-1)*10  0
//   //pg=3 20~  (3-2)*10  0

//   let sql=`
//             select count(*) cnt
//             from tb_board A
//             left outer join (select @rownum:=0) B on 1=1
//             left outer join tb_member C ON A.writer=C.userid
//           `; 
//   let results = await commonDB.mysqlRead(sql,[]);
//   let totalCnt = results[0]["cnt"];
  
//       sql=`
//             SELECT A.id, A.title,A.writer,A.num, A.username, A.contents
//               ,date_format(A.wdate, '%Y-%m-%d') wdate
//               FROM
//               (
//               select A.id, A.title, A.writer, A.wdate, C.username, A.contents
//               ,@rownum:=@rownum+1 num
//               FROM tb_board A
//               LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
//               LEFT OUTER JOIN tb_member C ON A.writer=C.userid
//               ORDER BY id DESC
//               )A
//               LIMIT ${(pg-1)*10}, 10
//           `;

//   results = await commonDB.mysqlRead(sql, []);
//   console.log( results );
//   res.render('board/board_list', { session: req.session,
//     boardList: results,
//     totalCnt: totalCnt,
//     pg: pg,
//     paging:commonUtil.getPaging(pg, totalCnt)});
// });


// router.get('/view/:id', async function(req, res, next) {
//   let id = req.params.id;
//   let sql = `select id, title, writer, 
//             contents, date_format(wdate, '%y-%m-%d')wdate
//             from tb_board where id=${id}`;
//   let results = await commonDB.mysqlRead(sql, [id]);
//   res.render('board/board_view', { board: results[0] });
// });


// results = await commonDB.mysqlRead(sql, []);
// console.log( results );
// res.json({ boardList: results, totalCnt: totalCnt, pg: pg});//응답 완료
// //한 함수내에서 res.json 호출하고 또 다시 res.send나 render나 json 호출 못한다

// module.exports = router;
