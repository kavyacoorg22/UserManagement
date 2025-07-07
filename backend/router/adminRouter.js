const express=require("express")
const router=express.Router()
const Admin=require('../model/adminModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()

router.post('/',async(req,res)=>{
  const {email,password}=req.body;
  try{
    const admin=await Admin.findOne({email})
    if(!admin) 
      return res.status(400).json({message:"Invalid Credential"})
   const matchPassword=await bcrypt.compare(password,admin.password)
   if(!matchPassword)
    return res.status(400).json({message:"invalid Credential"})
   const token=jwt.sign({id:admin._id},process.env.JWT_SECRET,{expiresIn:'1hr'})

   return res.status(200).json({message:"Login Success",token,admin})

  }catch(err)
  {
    console.log(err)
   return res.status(500).json({message:"Server error during login"})
  }
})



module.exports=router