const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//REGISTER a new user. 
//use bcrypt to hash the password as we dont want to expose any secrets in the database. 
router.post("/register", async (req, res) => {
    try {
        // generate a new password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        // create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });
        // save the new user to the database
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch(err) {
        // if there is an error, send it back to the client
        console.log(err)
        res.json({ message: err });
    }
});

//login 
router.post("/login", async (req, res) => {
    try {
        // find the user by email
        const user = await User.findOne({ email: req.body.email });
        // if the user is not found, send an error message
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // check if the password is correct
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        // if the password is incorrect, send an error message
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        // if the password is correct, send the user back to the client
        res.json(user);
    } catch(err) {
        // if there is an error, send it back to the client
        console.log(err)
        res.status(500).json(err);
        res.json({ message: err });
    }
});



router.get("/", (req, res) => {
    res.send("hey its auth route");
}) 

module.exports = router;