const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const qs = require("querystring");

const parseCookies = (cookie = "") =>
    cookie
        .split(";")
        .map((v) => v.split("="))
        .map(([k, ...vs]) => [k, vs.join("=")])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith("/login")) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: "/",
            "Set-Cookie": `name=${encodeURIComponent(
                name
            )}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`,
        });
        return res.end();
    } else if (cookies.name) {
        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8",
        });
        return res.end(`${cookies.name}님 안녕하세요`);
    } else {
        try {
            const data = await fs.readFile("./server4.html");
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
            });
            return res.end(data);
        } catch (err) {
            res.writeHead(500, {
                "Content-Type": "text/plain; charset=utf-8",
            });
            return res.end(err.message);
        }
    }
}).listen(8080, () => {
    console.log("8080 포트에서 서버 대기 중입니다!");
});
