request('dotenv').config()
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const authRoutes=require('./routes/auth');
const examRoutes=require('./routes/exam');
const app=express()
const PORT=process.env.PORT||5000;
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/exams',examRoutes);
app.get('/',(req,res)=>res.send('Exam scheduler API is running'));
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>console.log('Server listening on port ${PORT}'));

})
.catch(err=>{
    console.error('MongoDB connection error:',err);
    process.exit(1);
});