var express = require('express');
var router = express.Router();
var commonDB = require("./commonDB");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let sql=`
      select id, title, writer, 
      contents, date_format(wdate, '%y-%m-%d')wdate
      from tb_board
  `;

  let results = await commonDB.mysqlRead(sql, []);
  res.render('board/board_list', { boardList: results });
});

router.get('/view/:id', async function(req, res, next) {
  let id = req.params.id;
  let sql = `select id, title, writer, 
            contents, date_format(wdate, '%y-%m-%d')wdate
            from tb_board where id=${id}`;
  let results = await commonDB.mysqlRead(sql, [id]);
  res.render('board/board_view', { board: results[0] });
});



module.exports = router;
