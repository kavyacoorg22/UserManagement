const mongoose=require('mongoose')

const AdminSchema=new mongoose.Schema({
  email:{
    type:String,
    require:true
  },
  password:{
    type:String,
    reuire:true
  }
},{timestamps:true})

module.exports=mongoose.model("Admin",AdminSchema)