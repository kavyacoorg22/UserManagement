const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
  name:{
    type:String,
  },
  number:{
    type:Number,
  },
  email:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  image:{
    type:String,
    default:"https://www.w3schools.com/howto/img_avatar.png"
  },
   isBlocked: {
    type: Boolean,
    default: false,
  }
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema)