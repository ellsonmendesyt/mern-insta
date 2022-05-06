const express = require('express');
const { default: mongoose } = require('mongoose');
const log=console.log;
const env = require('dotenv').config();



// models
// require('./models/user.js');
// mongoose.model("User");

const router = require('./routes/auth.js');












const app = express();
app.use(express.json());
app.use(router)





const customMiddleware = (req, res, next) => {
    log('global middleware');
    next();
}

// app.use(customMiddleware); // usar pra todas as rotas

app.get('/',(req,res)=>{
  console.log(req)
    
   
    res.status(200).json({status:'success',message:'Welcome to the API'});
})



app.get('/about',customMiddleware, (req,res,next)=>{
    console.log('about page');
    res.status(200).send("about");
})














// contar com bando de dados
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connection.on("connected",()=>{
    console.log("Coenectado ao banco...")
    app.listen(process.env.PORT,()=>{
        console.log(`Server running on port ${process.env.PORT}`);
    })
})

mongoose.connection.on("error",(error)=>{
    console.log("Erro ao conectar ao banco "+error)
})
