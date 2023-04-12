let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const session = require("express-session")
const MYSQLSTORE = require("express-mysql-session")(session);
const DBInfo = require("./routes/commonDB") // 세션이 저장되 디비정보를 줘야 한다
const cors = require('cors');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let boardRouter = require('./routes/board');    //이거 추가했다
let memberRouter = require('./routes/member');  //연결해준거 member.js랑
let heroRouter = require('./routes/hero')
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//미들웨어 - 모든 웹상의 요청이 거쳐간다.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log( DBInfo.DBInfo);

let sessionStore = new MYSQLSTORE(DBInfo.DBInfo);
app.use(session({
  key: "session_key",
  secret:"rmsiddkanrjsk",
  store: sessionStore,
  resave:false,
  saveUninitialized:false
}));

app.use(cors());  //보다 정밀하게 받는 방법 찾아 작성해야 한다.
//현재는 아무데서나 요청오면 다 받음

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter);                 //이거 추가했다
app.use('/member', memberRouter);              //연결해줌
app.use('/hero', heroRouter);
//app.use('/member', memberRouter)는 Express 애플리케이션에서 /member 경로로 들어오는 HTTP 요청에 대해 memberRouter 미들웨어를 사용하도록 지정하는 코드입니다.
//memberRouter는 express.Router() 메서드를 사용하여 생성된 객체로, 여러 개의 라우팅 핸들러를 가지는 라우터 객체입니다. 이를 app.use() 메서드를 사용하여 Express 애플리케이션에 연결함으로써, /member 경로에 대한 HTTP 요청에 대해 memberRouter 객체가 처리할 수 있도록 합니다.
//예를 들어, memberRouter 객체가 /list, /create, /update, /delete와 같은 다양한 라우팅 핸들러를 가지고 있다면, app.use('/member', memberRouter) 코드는 /member/list, /member/create, /member/update, /member/delete와 같은 경로로 들어오는 HTTP 요청에 대해 memberRouter 객체가 적절한 라우팅 핸들러를 실행할 수 있도록 설정합니다.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
