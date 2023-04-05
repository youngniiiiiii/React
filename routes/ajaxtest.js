var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("ajaxtest");
});

//http://127.0.0.1:3000/ajax/ajaxtest1
router.get("/ajaxtest1", function (req, res, next) {
  res.render("ajax/ajaxtest1");
});

//send함수가 적당히 알아서 데이터를 보낸다.
router.get("/result1", function (req, res, next) {
  res.send("data만 보낸다");
});

router.get("/ajaxtest2", function (req, res, next) {
  res.render("ajax/ajaxtest2");
});

//send함수가 적당히 알아서 데이터를 보낸다.
router.use("/add", function (req, res, next) {
  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x + y;
  res.json({ result: z });
});

router.get("/ajaxtest3", function (req, res, next) {
  res.render("ajax/ajaxtest3_third_assignment");
});

//send함수가 적당히 알아서 데이터를 보낸다.
router.use("/score", function (req, res, next) {
  namedata = req.query.name;
  kor = parseInt(req.query.kor);
  eng = parseInt(req.query.eng);
  mat = parseInt(req.query.mat);
  sum = kor + eng + mat;
  avg = sum / 3;
  console.log(sum, avg);
  res.json({
    result: `${namedata}님의 총점은 ${sum}점 평균은 ${avg}점 입니다.`,
  });
});

module.exports = router;
