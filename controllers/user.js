const Users = require("../models/user")

async function handleGetAllUsers(req, res) {
    const allDbUsers = await Users.find({});
    // res.setHeader("X-MyName", "Pranav K"); //custom header
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    //edit user with id
    await Users.findByIdAndUpdate(req.params.id, { lastName: "Change" })
    return res.json({ status: "Success" });
}

async function handleDeleteUserById(req, res) {
    await Users.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All fields are req..." });
    }
    const result = await Users.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    // console.log(result);
    return res.status(201).json({ msg: "Sucess", id: result._id });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}