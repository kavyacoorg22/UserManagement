const express=require('express')
const app=express()
const connectDB=require('./db/connectDB')
require('dotenv').config()
const userRouter=require('./router/userRouter')
const cors=require('cors')

app.use(cors())
app.use(express.json())

app.use('/user',userRouter)
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

