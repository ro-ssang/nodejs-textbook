const express = require("express");
const User = require("../schemas/user");
const Comment = require("../schemas/comment");

const router = express.Router();

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const users = await User.find({});
            return res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const result = await User.create({
                name: req.body.name,
                age: req.body.age,
                married: req.body.married,
            });
            return res.status(201).json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.get("/:id/comments", async (req, res, next) => {
    try {
        const comments = await Comment.find({
            commenter: req.params.id,
        }).populate("commenter");
        console.log(comments);
        return res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
