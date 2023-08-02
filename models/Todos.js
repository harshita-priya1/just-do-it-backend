const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    status:{
        type:Boolean,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()+ 5.5*60*60*1000
    },
    endDate: {
        type: Date,
    }
});

module.exports = mongoose.model("todos", todoSchema);