var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB');

/* GET home page. */

router.get('/list', async function(req, res, next) {
  let sql=`
  SELECT A.ID, A.STUDENT_NAME, A.KOR, A.ENG, A.MAT, 
         DATE_FORMAT(A.WDATE, '%Y-%m-%d') WDATE
         FROM TB_SCORE A
  `;
  let results= await commonDB.mysqlRead(sql, []);
  res.json(results);

});

router.post('/write', async function(req, res, next) {
  try
  {
    let STUDENT_NAME = req.body.STUDENT_NAME;
    let KOR = req.body.KOR;
    let ENG = req.body.ENG;
    let MAT = req.body.MAT;
    let sql=`
        INSERT INTO TB_STUDENT( STUDENT_NAME, KOR, ENG, MAT, wdate)
        VALUES(?,?,?,? NOW())
        `;
  
    await commonDB.mysqlRead(sql, [STUDENT_NAME, KOR, ENG, MAT]);
    res.json({"result":"success"})
  }
  catch(e)
  {
    console.log(e);
    res.json({"result":"fail"})
  }
})

//http://localhost:9090/hero/view/1
router.get('/view/:id', async function(req, res, next) {
  try
  {
    let ID = req.params.ID;

    let sql=`
        SELECT * FROM TB_STUDENT where ID=${ID}`;
    let results = await commonDB.mysqlRead(sql, []);
    res.json({"result":"success", "score":results[0]});
  }
  catch(e)
  {
    console.log(e);
    res.json({"result":"fail"})
  }
})

module.exports = router;
