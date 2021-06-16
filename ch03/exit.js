let i = 1;
setInterval(() => {
    if (i == 5) {
        console.log("종료!");
        process.exit(0);
    }
    console.log(i);
    i += 1;
}, 1000);
