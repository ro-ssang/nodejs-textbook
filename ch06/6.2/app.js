const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

/*
개발시: dev 옵션을 주로 쓴다.
배포시: combined 옵션을 주로 쓴다.
*/
app.use(morgan("dev"));

app.use(cookieParser("secret code")); // cookie-parser 인수로 암호키를 넣을 수 있는데, 이것은 쿠키를 서명된(암호화된) 쿠키로 만든다.
/*
req.cookie(): 해석된 요청 쿠키를 사용할 수 있다.
res.cookie("name", "rossang", {
    expires: new Date(Date.now() + 5000000),
    httpOnly: true,
    secure: true,
}); : 응답 쿠키를 설정할 수 있다.
res.clearCookie("name", "rossang", { httpOnly: true, secure: true }); : 지울 때는 expires와 maxAge를 제외한 옵션들이 일치해야 한다.
*/

app.use(express.json()); // json 형태의 데이터를 해석한다.
app.use(express.urlencoded({ extended: true })); // form 으로 보내진 데이터를 해석한다. extended true면 외부 qs 모듈을 사용하고 false면 내부 모듈인 querystring을 사용한다.

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
    res.send("About 페이지");
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("에러 처리");
});

app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} 포트에서 서버 대기 중입니다!`);
});
