const express = require ('express');
const cors = require('cors');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/todos', async (req, res)=>{
    const createPayload = req.body;
    const response = createTodo.safeParse(createPayload);
    if (!response.success) {
        res.status(411).json({
            msg: "Invalid data"
        });
        return;
    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false      //manually added
    });
    res.status(201).json({
        msg: "Todo created successfully"
    });

})

app.get('/todos', async (req, res)=>{
    const todos = await todo.find();
    res.status(200).json(todos);
});

app.put('/updateTodo', async (req, res)=>{
    const updatePayload = req.body;
    const response = updateTodo.safeParse(updatePayload);
    if(!response.success){
        res.status(411).json({
            msg: "Invalid data"
        });
        return;
    }
   
    await todo.update({
        _id: updatePayload.id
    }, {
        completed: true
    });

    res.status(200).json({
        msg: "Todo updated successfully"
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});