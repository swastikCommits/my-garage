const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');
const { signupSchema, signinSchema, updateSchema } = require('../types');
const { User, Account } = require('../db');


router.post('/signup', async(req, res)=>{
    const payload = req.body;
    const parsedPayload = signupSchema.safeParse(payload);
    if(!parsedPayload.success){
        return res.status(411).json({
            message: 'Invalid request payload'
        });
    }

    const existingUser = await User.findOne({
        username: payload.username
    })
    if(existingUser){
        return res.status(411).json({
            message: 'Username already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await User.create({
        username: payload.username,
        password: hashedPassword,
        firstName: payload.firstName,
        lastName: payload.lastName
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    // Create a new account for the user with a random balance
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    res.status(200).json({
        message: 'User created successfully',
        token: token
    })

});

router.post('/signin', async(req, res)=>{
    const payload = req.body;
    const pasrsedPayload = signinSchema.safeParse(payload);
    if(!pasrsedPayload.success){
        return res.status(411).json({
            message: 'Invalid request payload'
        });
    }

    const user = await User.findOne({
        username: payload.username
    }); 
    if(user){
        const passMatch = await bcrypt.compare(payload.password, user.password);
        if(passMatch){
            const userId = user._id;
            const token = jwt.sign({
                userId
            }, JWT_SECRET);
            return res.status(200).json({
                message: 'Signin successful',
                token: token
            });
        }
    }

    res.status(411).json({
        message: 'Error while logging in'
    });
    
});

router.put('/update', authMiddleware, async(req, res)=>{
    const payload = req.body;
    const parsedPayload = updateSchema.safeParse(payload);
    if(!parsedPayload.success){
        return res.status(411).json({
            message: 'Invalid request payload'
        });
    }

    await User.updateOne(req.body,{
        _id: req.userId
    })

    res.status(200).json({
        message: 'User updated successfully'
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        }))
    })
})

module.exports = router;