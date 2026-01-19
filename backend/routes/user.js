const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const { signupSchema, signinSchema } = require('../types');
const { User } = require('../db');


router.post('/signup', async(req, res)=>{
    const payload = req.body;
    const parsedPayload = signupSchema.safeParse(payload);
    if(!parsedPayload.success){
        res.status(411).json({
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

    res.status(200).json({
        message: 'User created successfully',
        token: token
    })

});

router.get('/signin', async(req, res)=>{
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
        message: 'Invalid username or password'
    });
    
});

module.exports = router;