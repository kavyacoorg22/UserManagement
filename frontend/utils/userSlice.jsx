import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
  name:"User",
  initialState:{
     users: [],
    currentUser: null
  },
  reducers:{
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('token');
    },
    updateProfileImage: (state, action) => {
     if (state.currentUser) {
    state.currentUser.image = action.payload;
    }
   },
   getUsers: (state, action) => {
     state.users;
   },
    setUsers: (state, action) => {
      state.users = action.payload;
    }   
  }
})


export const {setCurrentUser,logoutUser,updateProfileImage,setUsers,getUsers}=userSlice.actions

export default userSlice.reducer;