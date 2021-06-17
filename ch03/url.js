const url = require("url");

// WHATWG 방식(username, password, origin, searchParams 속성이 존재)
const URL = url.URL;
const myURL = new URL(
    "http://www.gilbut.co.kr/book/bookList.aspx?sercate=0010010000#anchor"
);
console.log("new URL():", myURL); // 주소를 분해(WHATWG 방식)
console.log("url.format():", url.format(myURL)); // 주소를 조립(WHATWG 방식)
console.log("--------------------------------------------");
// Node 방식(username과 password 대신 auth, searchParams 대신 query 속성이 존재)
const parsedUrl = url.parse(
    "http://www.gilbut.co.kr/book/bookList.aspx?sercate=0010010000#anchor"
);
console.log("url.parse():", parsedUrl); // 주소를 분해(Node 방식)
console.log("url.format():", url.format(parsedUrl)); // 주소를 조립(Node 방식)

// 주소가 host 부분 없이 pathname 부분만 오는 경우(/book/bookList.apsx), Node방식 사용
