const express = require('express');

const router = express.Router();

const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = require("../controllers/user")


// router.get("/users", async (req, res) => {
//     const allDbUsers = await Users.find({});
//     const html = `
//     <ul>
//         ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email} </li>`).join("")}
//     </ul>
//     `
//     return res.status(200).send(html);
// })

//removed all /users, asuming all requests are made on users

//moved function to controllers

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

module.exports = router;