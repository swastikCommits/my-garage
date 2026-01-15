const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://swastikrpanigrahi:nvmPxMJh6kHKpf9L@0nyx.mdjy9.mongodb.net/todo-MERN')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    });

const todoSchema = mongoose.Schema({
    title : String,
    description: String,
    completed: Boolean,
});

const todo = mongoose.model('todo', todoSchema);

module.exports = {
    todo
}