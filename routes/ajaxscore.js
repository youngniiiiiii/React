var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
    res.render("ajaxscore")
});

router.get('/ajaxscore2', function(req,res,next) {
    res.render("ajax/ajaxscore2");
})

router.get('/result', function(req,res,next){
    res.send("아놔");
});

router.get('/score', function(req,res,next){
    name = req.query.name;
    kor = parseInt(req.query.kor);
    eng = parseInt(req.query.eng);
    mat = parseInt(req.query.mat);
    sum = kor+eng+mat;
    avg = (kor+eng+mat)/3;
    res.json({result:sum})
});

module.exports = router;
