const fs = require("fs").promises;

fs.readdir("./folder")
    .then((dir) => {
        console.log("폴더 내용 확인", dir);
        return fs.unlink("./folder/newfile.js");
    })
    .then(() => {
        console.log("파일 삭제 성공");
        return fs.rmdir("./folder");
    })
    .then(() => {
        console.log("폴더 삭제 성공");
    })
    .catch((err) => {
        throw err;
    });

/*
fs.readdir(): 폴더 안의 내용물을 확인할 수 있다.
fs.unlink(): 파일을 지울 수 있다. 파일이 없다면 에러가 발생하므로 머넞 파일이 있는지를 꼭 확인해야 한다.
fs.rmdir(): 폴더를 지울 수 있다. 폴더 안에 파일이 있다면 에러가 발생하므로 먼저 내부 파일을 모두 지우고 호출해야 한다.
*/
