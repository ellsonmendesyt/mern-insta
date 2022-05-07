
const jwt= require('jsonwebtoken');
const secretKey= process.env.SECRET_KEY;
const {User} = require('../models/user.js');

module.exports=(req,res,next)=>{
    const {authorization}=req.headers;

    // authorization= Bearer ewafg
    if(!authorization){
        return res.status(401).json({error:'You must be logged in'});
    }
    //remove Bearer part from the authorization
    const token=authorization.replace('Bearer','');
    jwt.verify(token,secretKey, (error,payload)=>{
        if(error){
            return res.status(401).json({error:'You must be logged in'});
        }

        const {_id}=payload;
        //append user data to the request
        User.findById(_id).then(userData=>{
            req.user=userData
        })
    })
    next();
}