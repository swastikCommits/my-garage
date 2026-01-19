const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://swastikrpanigrahi:nvmPxMJh6kHKpf9L@0nyx.mdjy9.mongodb.net/paytm-practice');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const User = mongoose.model('User', userSchema);

module.exports ={
    User
}