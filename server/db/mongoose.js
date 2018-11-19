const mongoose= require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp')
        .then((doc)=>{
             console.log("connection start");
            },
            (e)=>{
                   console.log("connection failed",e);
                }
            );

            module.exports={mongoose};