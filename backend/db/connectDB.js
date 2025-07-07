const mongoose = require("mongoose");
require("dotenv").config()

const connectDB=async()=>{
  mongoose.connect(process.env.DATABASE_URL)
}

module.exports=connectDB