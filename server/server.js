var {mongoose}= require('./db/mongoose');
var {Todo}= require('./models/todo.js');
var {user}= require('./models/User');
var {ObjectID}= require('mongodb');
var express =require('express');
var bodyParser=require('body-parser');
var port=process.env.Port || 3000;
var _ = require('lodash');


 var app =express();
 //middleware
    app.use(bodyParser.json());
    //post
    app.post('/todos',(req,res)=>{
        console.log(req.body)
        console.log(req.body.text);
        var newtodo =new Todo({
            text:req.body.text,
            completed:req.body.completed,
            completedAt:req.body.completedAt
        });
        newtodo.save().then((doc)=>{
            res.status(200).send(doc);
         },
         (e)=>{
             res.status(400).send(e);
            }
        );
    });
   
    //getall
    app.get('/todos',(req,res)=>{
        Todo.find().then((todos)=>{
            res.send({todos});
            //res.sendFile(path.join(__dirname, './index.html'));
        }),(e)=>{
            res.status(400).send(e);
        }
        
    });
    //getbyId
    app.get('/todos/:id',(req,res)=>{
        id=req.params.id;
       var validID= ObjectID.isValid(id);
       console.log(validID,id);
        if(!validID)
        {
            return res.status(404).send();

        }
        Todo.findById(id).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            return res.status(200).send(todo);
        })
        .catch((e)=>{
            res.status(400).send(e);
        });
    });
    //delete 
    app.delete('/todos/:id',(req,res)=>{
        id=req.params.id;
       var validID= ObjectID.isValid(id);
       console.log(validID,id);
        if(!validID)
        {
            return res.status(404).send();

        }
        Todo.findByIdAndRemove(id).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            return res.status(200).send(todo);
        })
        .catch((e)=>{
            res.status(400).send(e);
        });
    });
    //update
    app.patch('/todos/:id',(req,res)=>
    {
        id=req.params.id;
        var validID= ObjectID.isValid(id);
        console.log(validID,id);
         if(!validID)
         {
             return res.status(404).send();
 
         }

         var body=_.pick(req.body,["text","completed"]);
         if(_.isBoolean(body.completed)&&body.completed)
         {
             body.completedAt=new Date().getTime();
         }
         else
         {
            body.completedAt=null;
            body.completed=false;
         }
         Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            return res.status(200).send(todo);
        })
        .catch((e)=>{
            res.status(400).send(e);
        });
    });
app.listen(port,()=>{
    console.log("start listing in ",port);
})
module.exports={app};

 
 