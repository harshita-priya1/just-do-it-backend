const express = require("express");
const connectDB = require("./controllers/DBconnect");
const cors = require("cors");
const bodyParser = require("body-parser");

const UserRouter = require("./apis/UserRoute");
const TodoRouter = require("./apis/ToDoRoute");

const app = express();

const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/user", UserRouter);
app.use("/todo", TodoRouter);

app.get("/", (req,res) => {
    res.send("Welcome");
}
);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});