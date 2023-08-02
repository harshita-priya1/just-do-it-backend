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

router.get("/get", async (req,res) => {
    try {
        const userId = req.body.userId;
        let response = await TodoModel.find({userId:userId});
        if(response){
            res.status(200).json({data: response});
        }
        else{
            res.json({message: "No data found!"});
        }
    } catch (error) {
        res.status(500).json({ message: "Error while loading To-dos.", error: error});
    }
});

router.delete("/delete", async (req,res) => {
    try {
        const todoId = req.body.todoId;
        const deletedTodo = await TodoModel.findOneAndDelete({_id: todoId});
        if(deletedTodo){
            res.status(200).json({ message: 'To-do deleted successfully.', data: deletedTodo });
        } else {
            res.status(404).json({ message: 'To-do not found.' });
        }      
    } catch (error) {
        res.status(500).json({ message: "Error while deleting To-dos.", error: error});
    }
});

router.post("/update", async (req,res) => {
    try {
        const todoId = req.body.todoId;
        const todo = await TodoModel.findById(todoId);
        if(todo){
            todo.status = !todo.status;
            await todo.save();
            res.status(200).json({ message: `Status updated to: ${todo.status? "fulfilled!":"Not done yet!"}`, data: todo });
        } else {
            res.status(404).json({ message: 'To-do not found.' });
        }      
    } catch (error) {
        res.status(500).json({ message: "Error while updating status of To-dos.", error: error});
    }
});

router.post("/modify", async (req,res) => {
    try {
        const todoId = req.body.todoId;
        const newContent = req.body.content;
        const newEndDate = req.body.endDate;
        const todo = await TodoModel.findById(todoId);
        if(todo){
            if(newEndDate){
                todo.endDate = newEndDate;
            }
            if(newContent && newContent != todo.content){
                todo.content = newContent;
            }
            await todo.save();
            res.status(200).json({ message: `To-do modified!`, data: todo });
        } else {
            res.status(404).json({ message: 'To-do not found.' });
        } 
    } catch (error) {
        res.status(500).json({ message: "Error while modifying To-dos.", error: error});
    }
});

module.exports = router;