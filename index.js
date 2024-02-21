const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const { DbConnect } = require ('./connection')
const User = require('./model/user')


const app = express();
const PORT = 3000;
const url = 'mongodb+srv://Mobzway:xzmcbG3xlM2u6KeY@webservice.iee4s4a.mongodb.net/';
DbConnect(url);


app.use(cors());
app.use(bodyParser.json());


app.get('/api/user', async (req, res) => {
    try {
        const users = await User.find();
        
        let htmlResponse = '<html><head><title>User Data</title></head><body><h1>User Data</h1><table border="1"><thead><tr><th>Login ID</th><th>Name</th><th>Email</th><th>Mobile Number</th><th>Address</th></tr></thead><tbody>';

        users.forEach(user => {
            htmlResponse += `<tr><td>${user.loginId}</td><td>${user.firstName} ${user.lastName}</td><td>${user.emailId}</td><td>${user.mobileNumber}</td><td>${user.street} ${user.city} ${user.state}, ${user.country}</td></tr>`;
        });

        htmlResponse += '</tbody></table></body></html>';

        res.send(htmlResponse);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/api/user',async (req,res)=>{
    try {
        const {
            firstName,
            lastName,
            mobileNumber,
            emailId,
            street,
            city,
            state,
            country,
            loginId,
            password
        } = req.body;

        const newUser = new User({
            firstName,
            lastName,
            mobileNumber,
            emailId,
            street,
            city,
            state,
            country,
            loginId,
            password
        });

        await newUser.save();
        console.log("Record Created Successfully");
        res.status(201).send("Created")
    }catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }})

app.listen(PORT,()=>console.log(`Server Started at ${PORT}`));