const http = require("http");

const server = http
    .createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); // HTML 코드를 일반 문자로 읽을 수 있으므로 res 헤더에 "text/html"이라고 설정한다.
        res.write("<h1>Hello Node</h1>");
        res.end("<p>Hello Server!</p>");
    })
    .listen(8080);

server.on("listening", () => {
    console.log("8080번 포트에서 서버 대기 중입니다!");
});

server.on("error", (error) => {
    console.log(error);
});
