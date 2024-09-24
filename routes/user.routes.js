const express = require("express");
const {
  getAllUsers,
  showCreateForm,
  createUser,
  showEditForm,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const router = express.Router();

// Define routes for user operations
router.get("/users", getAllUsers); // GET all users
router.get("/users/new", showCreateForm); // GET form to create new user
router.post("/users", createUser); // POST create a new user
router.get("/users/edit/:id", showEditForm); // GET form to edit a user
router.post("/users/edit/:id", updateUser); // POST update user details
router.post("/users/delete/:id", deleteUser); // POST delete a user

module.exports = router;
