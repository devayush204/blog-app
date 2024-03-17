const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const User = require('./models/User')


app.use(cors());
app.use(express.json());


// mongoose.connect('mongodb://localhost:27017/');
mongoose.connect('mongodb+srv://blog:8ZmuYp5gOvIwC27w@cluster0.ptufpob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


app.post('/register', async(req, res) => {
    const {username, password} = req.body;
    try {
        const userDoc = await User.create({ username, password });
        res.json(userDoc);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.listen(6969, ()=>{
    console.log("server is running");
});