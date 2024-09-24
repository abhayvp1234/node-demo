const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to read users from JSON file
const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

// Helper function to write users to JSON file
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

// Get all users and render the list
exports.getAllUsers = (req, res) => {
    const users = readUsersFromFile();
    res.render('index', { users });
};

// Show form to create a new user
exports.showCreateForm = (req, res) => {
    res.render('userForm', { user: null });
};

// Create a new user
exports.createUser = (req, res) => {
    const users = readUsersFromFile();
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };
    users.push(newUser);
    writeUsersToFile(users);
    res.redirect('/users');
};

// Show form to edit an existing user
exports.showEditForm = (req, res) => {
    const users = readUsersFromFile();
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).render('error', { message: 'User not found' });
    res.render('userForm', { user });
};

// Update an existing user
exports.updateUser = (req, res) => {
    let users = readUsersFromFile();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).render('error', { message: 'User not found' });

    users[userIndex] = {
        id: parseInt(req.params.id),
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };

    writeUsersToFile(users);
    res.redirect('/users');
};

// Delete a user
exports.deleteUser = (req, res) => {
    let users = readUsersFromFile();
    users = users.filter(u => u.id !== parseInt(req.params.id));
    writeUsersToFile(users);
    res.redirect('/users');
};
