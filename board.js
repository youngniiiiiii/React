var express = require('express');
var router = express.Router();
var commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");

/* GET home page. */
router.get('/list/:pg', async function(req, res, next) {
  let pg = parseInt(req.params.pg);
  //pg=1 0~  (pg-1)*10  0
  //pg=2 10~  (2-1)*10  0
  //pg=3 20~  (3-2)*10  0

  let sql=`
            select count(*) cnt
            from tb_board A
            left outer join (select @rownum:=0) B on 1=1
            left outer join tb_member C ON A.writer=C.userid
          `; 
  let results = await commonDB.mysqlRead(sql,[]);
  let totalCnt = results[0]["cnt"];
  
      sql=`
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
  console.log( results );
  res.render('board/board_list', { session: req.session,
    boardList: results,
    totalCnt: totalCnt,
    pg: pg,
    paging:commonUtil.getPaging(pg, totalCnt)});
});

router.get('/view/:id', async function(req, res, next) {
  let id = req.params.id;
  let sql = `select id, title, writer, 
            contents, date_format(wdate, '%y-%m-%d')wdate
            from tb_board where id=${id}`;
  let results = await commonDB.mysqlRead(sql, [id]);
  res.render('board/board_view', { board: results[0] });
});
1


module.exports = router;
