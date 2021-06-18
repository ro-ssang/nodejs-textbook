const http = require("http");
const fs = require("fs").promises;

const users = {};

const server = http
    .createServer(async (req, res) => {
        try {
            if (req.method === "GET") {
                if (req.url === "/") {
                    const data = await fs.readFile("./restFront.html");
                    res.writeHead(200, {
                        "Content-Type": "text/html; charset=utf-8",
                    });
                    return res.end(data);
                } else if (req.url === "/about") {
                    const data = await fs.readFile("./about.html");
                    res.writeHead(200, {
                        "Content-Type": "text/html; charset=utf-8",
                    });
                    return res.end(data);
                } else if (req.url === "/users") {
                    const data = JSON.stringify(users);
                    res.writeHead(200, {
                        "Content-Type": "application/json; charset=utf-8",
                    });
                    return res.end(data);
                }
                try {
                    const data = await fs.readFile(`.${req.url}`);
                    return res.end(data);
                } catch (err) {
                    console.error(err.message);
                    res.writeHead(404, {
                        "Content-Type": "text/plain; charset=utf-8",
                    });
                    return res.end("NOT FOUND");
                }
            } else if (req.method === "POST") {
                if (req.url === "/user") {
                    let body = "";
                    req.on("data", (data) => {
                        body += data;
                    });
                    return req.on("end", () => {
                        console.log("POST 본문(Body):", body);
                        const { name } = JSON.parse(body);
                        const id = Date.now();
                        users[id] = name;
                        res.writeHead(201, {
                            "Content-Type": "text/plain; charset=utf-8",
                        });
                        res.end("ok");
                    });
                }
            } else if (req.method === "PUT") {
                if (req.url.startsWith("/user")) {
                    const key = req.url.split("/")[2];
                    let body = "";
                    req.on("data", (data) => {
                        body += data;
                    });
                    return req.on("end", () => {
                        console.log("PUT 본문(Body):", body);
                        const { name } = JSON.parse(body);
                        users[key] = name;
                        res.writeHead(200, {
                            "Content-Type": "text/html; charset=utf-8",
                        });
                        return res.end("ok");
                    });
                }
            } else if (req.method === "DELETE") {
                if (req.url.startsWith("/user")) {
                    const key = req.url.split("/")[2];
                    delete users[key];
                    res.writeHead(200, {
                        "Content-Type": "text/plain; charset=utf-8",
                    });
                    return res.end("ok");
                }
            }
            res.writeHead(404);
            return res.end("NOT FOUND");
        } catch (err) {
            console.error(err);
            res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end(err.message);
        }
    })
    .listen(8080);

server.on("listening", () => {
    console.log("8080 포트에서 서버 대기 중입니다!");
});

server.on("error", (err) => {
    console.error(err);
});
