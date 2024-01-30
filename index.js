const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT
const Expense = require('./models/expense')
mongoose.connect('mongodb+srv://ranjith:ranjith@cluster0.jgmk84t.mongodb.net/?retryWrites=true&w=majority',{
    useUnifiedTopology: true
});
app.get('/expense',async(req,res)=> {
    const expenses = await Expense.find();
    res.send (expenses);
})
app.get('/expense/:id',async(req,res)=> {
    
    const id = req.params.id;
    const result = await Expense.findById(id);
    if(result)
        res.send(result);
    else
        res.send("No Expenses found with that id");
})
    app.delete('/expense/:id',async(req,res)=> {
    try {
        const id = req.params.id;
        const result = await Expense.findByIdAndDelete(id);
        if(result)
            res.send(result);
        else
            res.send("No Expenses found with that id");
    } catch (err) {
        res.send(err)
    }
        });
app.use(express.json());
app.post('/expense',async(req,res) => {
    console.log(req.body);
    const newExpense = req.body;
    await Expense.create(newExpense);
    res.send('Created');
})

app.put('/expense/:id', async(req,res) => {
    const id = req.params.id;
    const updateObject = req.body;
    const updatedObject = await Expense.findByIdAndUpdate(id,
        {$set: updateObject},{
            new: true
        })
        res.send(updatedObject);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
