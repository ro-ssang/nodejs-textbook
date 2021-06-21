const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public"))); // 정적 파일을 제공한다.
app.use(cookieParser("secret code"));
app.use(
    session({
        resave: false, // 요청이 왔을 때 세션에 수정 사항이 생기지 않더라도 저장할 것인가?
        saveUninitialized: false, // 세션에 저장할 내역이 없더라도 세션을 저장할 것인가?
        secret: "secret code", // 필수 항목. 쿠키에 서명을 추가한다. 쿠키파서의 비밀키와 같게 한다.
        cookie: {
            httpOnly: true, // true: 클라이언트에서 쿠키를 확인하지 못한다. false: 클라이언트에서 쿠키를 확인할 수 있다.
            secure: false, // true: https인 환경에서만 사용할 수 있다. false: https가 아닌 환경에서도 사용할 수 있다. 배포시에는 true https를 적용하고 true로 설정하는 것이 좋다.
        },
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
