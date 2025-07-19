const express=require('express')
const router=express.Router()
const User=require('../model/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require("dotenv").config()
const multer = require('multer');
const path = require('path');
const adminAuth=require('../middleware/adminAuth')
const validateRegister=require('../middleware/validator')
const authenticate = (req, res, next) => {
    const token = req.cookies.token; 

  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.post('/register',validateRegister,async(req,res)=>{
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
  
    if (user.isBlocked) return res.status(403).json({ message:"You are blocked by the admin" });

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
   
      res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict", 
      maxAge: 60 * 60 * 1000 
    });
      const { password: _, ...userWithoutPassword } = user.toObject();
  

    return res.status(200).json({ message: "Login Success", user: userWithoutPassword});
    

  }catch(err)
  {
    console.log(err)
    return res.status(500).json("Server Error during login")
  }
})



router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  return res.status(200).json({ message: 'User logged out successfully' });
});





router.get('/all',adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); 
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error while fetching users" });
  }
});

router.put('/block/:id', adminAuth,async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
router.delete('/:id',adminAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong while deleting user' });
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });


router.post('/upload-profile', authenticate, upload.single('profileImage'), async (req, res) => {
  try {
    const userId = req.userId; 
    const imagePath = req.file.path;

    const user = await User.findByIdAndUpdate(
      userId,
      { image: imagePath },
      { new: true }
    );

    return res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error uploading image" });
  }
});

module.exports=router;