import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
  name:"User",
  initialState:{
    users:[]
  },
  reducers:{
    addUser:(state,action)=>{
      state.users.push(action.payload)
    },
    getUsers:(state,action)=>{
      state.users
    }
  }
})


export const {addUser,getUsers}=userSlice.actions

export default userSlice.reducer;