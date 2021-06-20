const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

// 에러 발생 시키기
app.use((req, res, next) => {
    throw new Error("에러 발생!");
});

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
