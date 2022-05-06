const mongoose = require('mongoose');


// criar o schema
const userSchema=new mongoose.Schema({
 name:{
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

// Criar o Model

const User=mongoose.model('User',userSchema);
module.exports={User};









