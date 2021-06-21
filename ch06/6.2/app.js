const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const fs = require("fs");

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
    fs.readdirSync("uploads");
} catch (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads/");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(
                null,
                path.basename(file.originalname, ext) + Date.now() + ext
            );
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    }),
});

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file, req.body);
    res.send("ok");
});

app.post("/upload", upload.none(), (req, res) => {
    console.log(req.body);
    res.send("ok");
});

app.post("/upload", upload.array("image"), (req, res) => {
    console.log(req.files, req.body);
    res.send("ok");
});

app.post(
    "/upload",
    upload.fileds({ name: "image1" }, { name: "image2" }),
    (req, res) => {
        console.log(req.files, req.body);
        res.send("ok");
    }
);

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
