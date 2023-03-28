const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "cassano$kill"
let success = false;

//ROUTE 1  : Create a user using : POST "/api/auth/createuser",Login is not required
router.post('/createuser',
    [
        body('name').isLength({ min: 3 }),
        body('email', 'Enter a valid Email').isEmail(),
        body('password').isLength({ min: 5 }),
    ],
    async (req, res) => {
        //If there are errors ,return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, error: errors.array() })
        }
        //Check whether the user with this email exist already

        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.state(400).json({ success, error: "Sorry a user with this email already exist" })
            }

            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt)
            //Create new User
            user = await User.create({
                name: req.body.name,
                password: secpass,
                email: req.body.email,
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            //Json web token generate for the auth key for user
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true
            res.json({ success, authToken })
            // res.json(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).send(success, "Internal Server Error");
        }
    }
)


//ROUTE 2  : Authenticate a User Using POST "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],
    async (req, res) => {

        //If there are errors ,return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, error: errors.array() })
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct email " })
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please try to login with correct  password" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            //Json web token generate for the auth key for user
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true
            res.json({ success, authToken })

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error");
        }
    }
)

//ROUTE 3  : Get  User Data  Using POST "/api/auth/getuser" , Login Required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router