const express = require("express");
const User = require("../schemas/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await User.find({});
        return res.render("mongoose", { users });
    } catch (err) {
        console.err(err);
        next(err);
    }
});

module.exports = router;
