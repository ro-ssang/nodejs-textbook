const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.send("Hello, Express");
});

app.get("/about", (req, res) => {
    res.send("About 페이지");
});

app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} 포트에서 서버 대기 중입니다!`);
});
