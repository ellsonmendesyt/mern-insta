const express= require('express')
const router = express.Router();

const {User}= require('../models/user.js');




router.get('/', (req,res)=>{
   res.send('hello')
});


router.post('/signup',(req,res)=>{
    // console.log(req.body.name);
    const {name,email,password}=req.body;

    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:'Email already exists'});
        }

        // criar um novo usuario
        const user= new User({
            email,
            password,
            name
        });

        // salvar o usuario
        user.save()
        .then((user)=>{
            res.json({usuariosalvo:user});
        }).catch((error)=>console.log(error.message));
        
    }).catch(erro=>{console.log(error.message)})
   
})


module.exports=router;