const express= require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User}= require('../models/user.js');







router.post('/signup',(req,res)=>{
    // console.log(req.body.name);
    const {name,email,password}=req.body;

    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:'Email already exists'});
        }

        bcrypt.hash(password,12)
        .then((hashedPassword)=>{

            // criar um novo usuario
            const user= new User({
                email,
                password:hashedPassword,
                name
            });
    
            // salvar o usuario
            user.save()
            .then((user)=>{
                res.json({usuariosalvo:user});
            }).catch((error)=>console.log(error.message));
        });


    }).catch(erro=>{console.log(error.message)})
   
})


router.post('/signin', (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:'Please provide email and password'});
    }

    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
        return res.status(422).json({error:'Invalid email or password'});
        }

        // we found the user 
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // user signed in
                res.json({message:'You are signed in'});
            }else{
                return res.status(422).json({error:'Invalid email or password'});
            }
        }).catch((error)=>{
            console.log(error)
        })
    }).catch(error=>{console.log(error)})
})

module.exports=router;