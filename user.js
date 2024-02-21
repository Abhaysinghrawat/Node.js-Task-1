const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type: String , require: true,unique: true},
    lastName: String,
    mobileNumber: {type: String , require: true,unique: true},
    emailId: {type: String , require: true,unique: true},
    street: String,
    city: String,
    state: String,
    country: String,
    loginId: {type: String , require: true,unique: true},
    password: String
},{timestamps : true});
const User = mongoose.model('User', userSchema);

module.exports= User;