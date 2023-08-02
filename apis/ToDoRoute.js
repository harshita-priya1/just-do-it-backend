const express = require("express");

const router = express.Router();

const UserModel = require("../models/User");
const TodoModel = require("../models/Todos");

router.post("/create", async (req,res) => {
    try {
        let {content, endDate, userId} = req.body;
        content = content.trim();
        let todo = new TodoModel({
            status: false,
            userId: userId,
            content: content
        });
        if(endDate){
            todo = new TodoModel({
                status: false,
                userId: userId,
                content: content,
                endDate: endDate
            });
        }
        const savedTodo = await todo.save();
        if(savedTodo){
            res.status(200).json({message: "To-do list created!", data: savedTodo});
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating To-dos.", error: error});
    }
});

module.exports = router;