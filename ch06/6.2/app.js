const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const fs = require("fs");

const app = express();

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser("secret code"));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "secret code",
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
        // 저장할 공간에 대한 정보, diskStorage는 하드디스크에 업로드 파일을 저장한다는 것
        destination(req, file, done) {
            // 저장할 파일 경로
            done(null, "uploads/");
        },
        filename(req, file, done) {
            // 저장할 파일명(파일명 + 날짜 + 확장자 형식)
            const ext = path.extname(file.originalname);
            done(
                null,
                path.basename(file.originalname, ext) + Date.now() + ext
            );
        },
        limits: { fileSize: 5 * 1024 * 1024 }, // 파일 개수나 파일 사이즈를 제한할 수 있음
    }),
});

app.post("/upload", upload.single("image"), (req, res) => {
    // 하나의 파일을 업로드 할 때
    console.log(req.file, req.body); // req.files 안에 업로드 정보 존재
    res.send("ok");
});

app.post("/upload", upload.none(), (req, res) => {
    // 파일을 업로드하지 않을 때
    console.log(req.body); // req.file 안에 업로드 정보 존재
    res.send("ok");
});

app.post("/upload", upload.array("image"), (req, res) => {
    // 여러개의 파일을 업로드 할 때, array는 하나의 요청 body 이름 아래 여러 파일이 있는 경우
    console.log(req.files, req.body); // req.files 안에 업로드 정보 존재
    res.send("ok");
});

app.post(
    "/upload",
    upload.fileds({ name: "image1" }, { name: "image2" }),
    (req, res) => {
        // 여러개의 파일을 업로드 할 때, fields는 여러 개의 요청 body 이름 아래 파일이 하나씩 있는 경우
        console.log(req.files, req.body); // req.files 안에 업로드 정보 존재
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
