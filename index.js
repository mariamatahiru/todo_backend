import express from 'express';
import mongoose from 'mongoose';
import todoModel from './schemas/todo_schema.js';
import TodoModel from './schemas/todo_schema.js';

const app =express();
app.use(express.json());

mongoose.connect('mongodb+srv://mariamatahiru:mariama307@cluster0.fcz0u.mongodb.net/myTask?retryWrites=true&w=majority',{
    useUnifiedTopology:true
}).then(()=>{console.log('connected to mongoDB succesfully')}).catch((err)=>{console.log(err)}),


//get all todos
app.get('/todos',async(req,res)=>{
    try {
        const todos = await TodoModel.find({});
        return res.status(200).json({
            status:true,
            message:'Todos fetched successfully',
            data:todos
        })
    } catch (error) {
        console.log('something went wrong',error);
        res.status(400).send('failed to fetch todos',error)
        
    }
    
})

//create a todo
app.post('/todos',async(req,res)=>{
    try {
        const newtodo=await TodoModel.create({...req.body})
        res.status(200).json({
            status:true,
            message:'todo created successfully',
            data:newtodo
        })
        
    } catch (error) {
       console.log('something went wrong',error);
       //res.status(400).send('failed to fetch todos',error) 
    }
})
app.delete('/todos/:id',async(req,res)=>{
    try{
        const{id}=req.params;
        const deletetodo=await TodoModel.findByIdAndDelete(id);
        return res.status(200).json({
            message:'todo deleted successfully'
        })
    }catch(error){
        console.log ('something went wrong',error);

    }
})

app.listen(3000)