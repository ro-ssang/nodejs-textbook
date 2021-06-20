const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

// 에러 발생 시키기
app.use((req, res, next) => {
    try {
        console.log(asdgasdg);
    } catch (error) {
        next(error); // next()의 인수에 값을 할당하면 에러로 처리된다.
    }
});

app.get(
    "/",
    (req, res, next) => {
        if (true) {
            next("route"); // next()의 인수에 "route"를 넣으면 다음 미들웨어는 실행 되지 않고, 일치하는 다음 라우터가 실행된다(여기서는 "/").
        }
        res.sendFile(path.join(__dirname, "index.html"));
    },
    (req, res) => {
        console.log("실행 되나요?");
    }
);

app.get("/", (req, res) => {
    console.log("실행 됩니다.");
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
