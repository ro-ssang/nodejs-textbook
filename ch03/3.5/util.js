const util = require("util");
const crypto = require("crypto");

const dontUseMe = util.deprecate((x, y) => {
    console.log(x + y);
}, "dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!");
dontUseMe(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
    .then((buf) => {
        console.log(buf.toString("base64"));
    })
    .catch((error) => {
        console.error(error);
    });

/*
util.deprecate(): 함수가 deprecated 처리되었음을 알려준다. 첫 번째 인자로 함수를 두 번째 인자로 경고 메세지 내용을 넣으면 된다.
util.promisify(): 콜백 패턴을 프로미스 패턴으로 바꿔준다. 이렇게 바꾸면 async/await 패턴까지 사용할 수 있다. 단, 콜백이 (error, data) => {} 방식이어야 한다.
*/
