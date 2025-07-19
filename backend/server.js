const express=require('express')
const app=express()
const connectDB=require('./db/connectDB')
require('dotenv').config()
const userRouter=require('./router/userRouter')
const cors=require('cors')
const path=require('path')
const adminRouter=require('./router/adminRouter')
const cookieParser = require('cookie-parser');

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());



app.use('/user',userRouter)
app.use('/admin',adminRouter)



const startServer=async()=>{
  try{
    await connectDB()
    console.log('Database is connected')
    
    app.listen(process.env.PORT,()=>{
     console.log(`Server Running on ${process.env.PORT} Port`)
    })

  }catch(err)
  {
    console.log(err)
  }
}
startServer()

