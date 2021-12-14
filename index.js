import dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import TodoModel from './schemas/todo_schema.js';
dotenv.config();
const app =express();
app.use(express.json());
const db =process.env.DR_URL;
const port =process.env.PORT||5000

mongoose.connect(db,{
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

app.patch('/todo/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const {status}=req.body;
        const updateTodo=await TodoModel.updateOne({status:status}).where({__id:id})
        return res.status(201).json({
            status:true,
            message:'Todo update successfully',
            data:updateTodo
        })

    }catch(error) {console.log('something went wrong',error)
}

})

app.listen(port)