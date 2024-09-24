const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Static files
app.use('/public', express.static('public'));

// Routes
app.use('/', userRoutes);

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
