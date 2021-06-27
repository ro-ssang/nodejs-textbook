const mongoose = require("mongoose");

const connect = () => {
    if (process.env.NODE_ENV !== "production") {
        mongoose.set("debug", true);
    }
    mongoose.connect(
        "mongodb://root:nodejsbook@localhost:27017/admin",
        {
            dbName: "nodejs",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        },
        (error) => {
            if (error) {
                console.error("몽고디비 연결 오류", error);
            } else {
                console.log("몽고디비 연결 성공");
            }
        }
    );
};

mongoose.connection.on("error", (error) => {
    console.error("몽고디비 연결 오류", error);
});
mongoose.connection.on("disconnected", () => {
    console.log("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
    connect();
});

module.exports = connect;
