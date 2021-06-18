const form = document.getElementById("form");

async function getUser() {
    try {
        const res = await axios.get("/users");
        const users = res.data;
        const list = document.getElementById("list");
        list.innerHTML = "";
        Object.keys(users).forEach((key) => {
            const userDiv = document.createElement("div");
            const userName = document.createElement("span");
            userName.textContent = users[key];
            const editBtn = document.createElement("button");
            editBtn.textContent = "수정";
            editBtn.addEventListener("click", async () => {
                const name = prompt("바꿀 이름을 입력하세요");
                if (!name) {
                    return alert("이름을 반드시 입력하셔야 합니다");
                }
                try {
                    await axios.put(`/user/${key}`, { name });
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            });
            const delBtn = document.createElement("button");
            delBtn.textContent = "삭제";
            delBtn.addEventListener("click", async () => {
                try {
                    await axios.delete(`/user/${key}`);
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            });
            userDiv.appendChild(userName);
            userDiv.appendChild(editBtn);
            userDiv.appendChild(delBtn);
            list.appendChild(userDiv);
            console.log(res.data);
        });
    } catch (err) {
        console.error(err);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    if (!name) {
        return alert("이름을 입력하세요");
    }
    try {
        await axios.post("/user", { name });
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.username.value = "";
});

window.addEventListener("load", () => {
    getUser();
});
