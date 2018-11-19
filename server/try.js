var newtodo =new todo({
    text:'playing'
})
newtodo.save().then((doc)=>{
    console.log("todod saved",doc);
},(e)=>{
console.log("error in connect",e);
}
);
var OTHERTODO =new todo({
   text:'runing',
   completed:false,
   completedAt:0
})
OTHERTODO.save().then((doc)=>{
   console.log("todod saved",doc);
},(e)=>{
console.log("error in connect",e);
}
);
//UserModel

var newuser =new user({
   email:'nm3333@gmail.com'
})
newuser.save().then((doc)=>{
   console.log("newuser saved",doc);
},(e)=>{
console.log("error in connect",e);
}
);



var newtodo =new Todo({
    text:req.body.text
});
todo.save().then((doc)=>{
    res.send(doc);
 },
 (e)=>{
     res.send(e);
     }
);