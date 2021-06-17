const crypto = require("crypto");

console.log(
    "base64:",
    crypto.createHash("sha512").update("비밀번호").digest("base64")
);
console.log(
    "hex:",
    crypto.createHash("sha512").update("비밀번호").digest("hex")
);
console.log(
    "base64:",
    crypto.createHash("sha512").update("다른 비밀번호").digest("base64")
);

/* 
createHash(): 사용할 해쉬 알고리즘을 넣어준다. md5, sha1, sha256, sha512가 있고 md5, sha1은 취약점이 발견되었으므로, sha256이나 sha512를 주로 쓴다.
update(): 변환할 문자열을 넣어준다.
digest(): 인코딩할 알고리즘을 넣어준다. base64, hex, latin1이 주로 사용되는데, 그중 base64가 결과 문자열이 가장 짧아 애용된다. 결과물로 변환된 문자열을 반환한다.
*/
