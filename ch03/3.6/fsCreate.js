const fs = require("fs").promises;
const constants = require("fs").constants;

fs.access("./folder", constants.F_OK | constants.R_OK | constants.W_OK)
    .then(() => {
        return Promise.reject("이미 폴더 있음");
    })
    .catch((err) => {
        if (err.code === "ENOENT") {
            console.log("폴더 없음");
            return fs.mkdir("./folder");
        }
        return Promise.reject(err);
    })
    .then(() => {
        console.log("폴더 만들기 성공");
        return fs.open("./folder/file.js", "w");
    })
    .then((fd) => {
        console.log("빈 파일 만들기 성공", fd);
        return fs.rename("./folder/file.js", "./folder/newfile.js");
    })
    .then(() => {
        console.log("이름 바꾸기 성공");
    })
    .catch((err) => {
        console.error(err);
    });

/*
fs.access(): F_OK는 파일 존재 여부, R_OK 읽기 권한 여부, W_OK는 쓰기 권한 여부 체크. 파일/폴더나 권한이 없다면 에러가 발생 -> 파일/ 폴더가 없다면 에러 코드는 "ENOENT"
fs.mkdir(): 폴더를 만드는 메서드. 이미 폴더가 있다면 에러가 발생하므로 access() 메서드를 호출해서 확인하는 것이 중요.
fs.open(): 파일의 아이디를 가져오는 메서드. 파일이 없다면 파일을 생성한 뒤 아이디를 가져온다. 가져온 아이디를 사용해 fs.read()나 fs.write()로 읽거나 쓸 수 있다. 두 번째 인자로는 어떤 동작을 할 것인지 설정할 수 있다.(w: 쓰기, r: 읽기, a: 기존 파일에 추가)
fs.rename(): 파일의 이름을 바꾸는 메서드. 기존 파일 위치와 새로운 파일 위치를 적어주면 된다. 반드시 같은 폴더를 지정할 필요는 없으므로 잘라내기 같은 기능을 할 수도 있다.
*/
