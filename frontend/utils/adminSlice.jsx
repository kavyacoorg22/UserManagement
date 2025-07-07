import { createSlice } from "@reduxjs/toolkit";

const adminSlice=createSlice({
  name:"admin",
  initialState:{
    currentAdmin:null
  },
  reducers:{
   setAdmin:(state,action)=>{
    state.currentAdmin=action.payload
   },
   removeAdmin:(state,action)=>{
    state.currentAdmin=null;
    localStorage.removeItem('token')
   }
  }
})

export const {setAdmin,removeAdmin}=adminSlice.actions;

export default adminSlice.reducer;