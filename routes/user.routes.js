const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const userController = require('../controllers/user.controller')

//GET
router.get("/users", userController.getUsers)

//BY ID
router.get("/users/:id", userController.getUsersById)

//POST
router.post("/users", userController.postUser)

//DELETE
router.delete("/users/:id", auth, isAdmin, userController.deleteUser)

//PUT
router.put("/users/:id", auth, isAdmin, userController.updateUser)

router.post("/login", userController.login);

module.exports = router;