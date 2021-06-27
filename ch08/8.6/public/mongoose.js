document.querySelectorAll("#user-list tr").forEach((el) => {
    el.addEventListener("click", () => {
        const id = el.querySelector("td").textContent;
        getComments(id);
    });
});

async function getUsers() {
    try {
        const response = await axios.get("/users");
        const users = response.data;
        const tbody = document.querySelector("#user-list tbody");
        tbody.innerHTML = "";
        users.forEach((user) => {
            const row = document.createElement("tr");
            row.addEventListener("click", () => {
                console.log("hi");
                getComments(users._id);
            });
            let td = document.createElement("td");
            td.textContent = user._id;
            row.appendChild(td);
            td = document.createElement("td");
            td.textContent = user.name;
            row.appendChild(td);
            td = document.createElement("td");
            td.textContent = user.age;
            row.appendChild(td);
            td = document.createElement("td");
            td.textContent = user.married ? "기혼" : "미혼";
            row.appendChild(td);
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

async function getComments(id) {
    try {
        const response = await axios.get(`/users/${id}/comments`);
        const comments = response.data;
        const tbody = document.querySelector("#comment-list tbody");
        tbody.innerHTML = "";
        comments.forEach((comment) => {
            const row = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = comment._id;
            row.appendChild(td);
            td = document.createElement("td");
            td.textContent = comment.commenter._id;
            row.appendChild(td);
            td = document.createElement("td");
            td.textContent = comment.comment;
            row.appendChild(td);
            td = document.createElement("td");
            const editBtn = document.createElement("button");
            editBtn.addEventListener("click", async () => {
                const newComment = prompt("바꿀 내용을 입력해 주세요");
                if (!newComment) {
                    return alert("내용을 반드시 입력하셔야 합니다");
                }
                try {
                    await axios.patch(`/comments/${comment._id}`, {
                        comment: newComment,
                    });
                    getComments(id);
                } catch (err) {
                    console.error(err);
                }
            });
            editBtn.textContent = "수정";
            td.appendChild(editBtn);
            row.appendChild(td);
            td = document.createElement("td");
            const delBtn = document.createElement("button");
            delBtn.addEventListener("click", async () => {
                try {
                    await axios.delete(`/comments/${comment._id}`);
                    getComments(id);
                } catch (err) {
                    console.error(err);
                }
            });
            delBtn.textContent = "삭제";
            td.appendChild(delBtn);
            row.appendChild(td);
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

document.getElementById("user-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const age = e.target.age.value;
    const married = e.target.married.checked;
    if (!name) {
        return alert("이름을 입력해주세요");
    }
    if (!age) {
        return alert("나이를 입력해주세요");
    }
    try {
        await axios.post("/users", { name, age, married });
        getUsers();
    } catch (err) {
        console.error(err);
    }
    e.target.name.value = "";
    e.target.age.value = "";
    e.target.married.checked = false;
});

document
    .getElementById("comment-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = e.target.userid.value;
        const comment = e.target.comment.value;
        if (!id) {
            return alert("아이디를 입력해주세요");
        }
        if (!comment) {
            return alert("댓글을 입력해주세요");
        }
        try {
            await axios.post("/comments", { id, comment });
            getComments(id);
        } catch (err) {
            console.error(err);
        }
        e.target.userid.value = "";
        e.target.comment.value = "";
    });
