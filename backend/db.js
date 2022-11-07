const mongoose=require('mongoose');
const env=require('dotenv');
env.config();
mongoose.connect(process.env.MONGO_URL ,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err.message); 
})