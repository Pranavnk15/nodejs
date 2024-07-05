const express = require('express');
const mongoose = require('mongoose');

const app = express();
//middle ware
app.use(express.urlencoded({extended: true}));

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
    },
    lastName: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    }
}, {timestamps: true});

const Users = mongoose.model("user", userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/yt-node-app')
.then(() => console.log("Mongodb Connected"))
.catch((err) => console.log("error", err));

app.get("/users", async (req, res) => {
    const allDbUsers = await Users.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email} </li>`).join("")}
    </ul>
    `
    return res.status(200).send(html);
})

app.get("/api/users", async(req, res) => {
    const allDbUsers = await Users.find({});
    res.setHeader("X-MyName", "Pranav K"); //custom header
    return res.json(allDbUsers);

})

app
.route("/api/users/:id")
.get(async(req, res) => {
    const user = await Users.findById(req.params.id);
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json(user);
})
.patch(async(req, res) => {
    //edit user with id
    await Users.findByIdAndUpdate(req.params.id, {lastName: "Change"})
    return res.json({status: "Success"});
})
.delete(async(req, res) =>{
    await Users.findByIdAndDelete(req.params.id);
    return res.json({status: "Success"});
})


app.post("/api/users", async(req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({msg: "All fields are req..."});
    }
    const result = await Users.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    // console.log(result);
    return res.status(201).json({msg: "Sucess"});
})


app.listen(8000, ()=> console.log("Server Started at port 8000"));