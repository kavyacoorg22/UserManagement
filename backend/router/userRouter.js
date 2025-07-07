const express=require('express')
const router=express.Router()
const User=require('../model/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require("dotenv").config()


router.post('/register',async(req,res)=>{
  const {name,number,email,password}=req.body;
  try{
   const existUser=await User.findOne({email})
   if(existUser) 
    return res.status(400).json({message:"UserAlready Exists"})

   const hashPassword=await bcrypt.hash(password,10)
   await User.create({name,number,email,password:hashPassword}) 
   return  res.status(201).json({message:"Register Successfully"})
  }catch(err)
  {
    console.log(err)
   return  res.status(500).json({message:"Server Error duriing register"})
  }

})


router.post('/',async(req,res)=>{
  const {email,password}=req.body;

  try{
    const user=await User.findOne({email})
    if(!user)
     return res.status(400).json({message:"User Not found"})
    const matchPassword=await bcrypt.compare(password,user.password)
    if(!matchPassword)
    return  res.status(400).json({message:"Invalid credential"})
   
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
    return res.status(200).json({message:"Login Successs",token})

  }catch(err)
  {
    console.log(err)
    return res.status(500).json("Server Error during login")
  }
})


module.exports=router;