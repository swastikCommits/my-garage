const zod = require('zod');

const signupSchema = zod.object({
    username: zod.string().min(3).max(30),
    password: zod.string().min(6).max(100),
    firstName: zod.string().min(1).max(50),
    lastName: zod.string().min(1).max(50)
});

const signinSchema = zod.object({
    username: zod.string().min(3).max(30),
    password: zod.string().min(6).max(100)
})

module.exports = { 
    signupSchema, signinSchema
};
