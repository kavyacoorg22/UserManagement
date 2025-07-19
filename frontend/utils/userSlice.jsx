import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
  name:"User",
  initialState:{
     users: [],
    currentUser: null,
  },
  reducers:{
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    updateProfileImage: (state, action) => {
     if (state.currentUser) {
    state.currentUser.image = action.payload;
    }
   },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
   deleteUser: (state, action) => {
  state.users = state.users.filter(user => user._id !== action.payload);
},

   
  }
})


export const {setCurrentUser,logoutUser,updateProfileImage,setUsers,getUsers,deleteUser}=userSlice.actions

export default userSlice.reducer;