const EventEmitter = require("events");

const myEvent = new EventEmitter();
myEvent.addListener("event1", () => {
    console.log("이벤트 1");
});
myEvent.on("event2", () => {
    console.log("이벤트 2");
});
myEvent.on("event2", () => {
    console.log("이벤트 2 추가");
});

myEvent.emit("event1");
myEvent.emit("event2");

myEvent.once("event3", () => {
    console.log("이벤트 3");
});

myEvent.emit("event3");
myEvent.emit("event3");

myEvent.on("event4", () => {
    console.log("이벤트 4");
});
myEvent.removeAllListeners("event4");
myEvent.emit("event4");

const listener = () => {
    console.log("이벤트 5");
};
myEvent.on("event5", listener);
myEvent.removeListener("event5", listener);
myEvent.emit("event5");

console.log(myEvent.listenerCount("event2"));

/*
on(): 이벤트 이름과 이벤트 발생 시의 콜백을 연결해준다. 이렇게 연결하는 동작을 이벤트 리스닝이라고 부른다. event2처럼 이벤트 하나에 여러 개를 달아줄 수도 있다.
addListener(): on과 기능이 같다.
emit(): 이벤트를 호출하는 메서드.
once(): 한 번만 실행되는 이벤트. myEvent.emit("event3")를 두 번 연속 호출했지만 콜백이 한 번만 실행된다.
removeAllListeners(): 이벤트에 연결된 모든 이벤트 리스너를 제거한다.
removeListener(): 이벤트에 연결된 리스너를 하나씩 제거한다.
off(이벤트명, 콜백): removeListener와 기능이 같다.
listenerCount(): 현재 리스너가 몇 개 연결되어 있는지 확인한다.
*/
