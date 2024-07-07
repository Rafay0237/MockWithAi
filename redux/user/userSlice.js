import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUsername: (state, action) => {
      state.currentUser.user.userName = action.payload;
    },
    updatePassword: (state, action) => {
      state.currentUser.user.password = action.payload;
    },
    deleteAccount:(state)=>{
      state.currentUser=null
    },
    signOut:(state)=>{
      state.currentUser=null
    },
    updateProfilePicture:(state,action)=>{
      state.currentUser.user.profilePicture=action.payload;
    }
  },
});

export const {
  loginSuccess,
  updatePassword,
  updateUsername,
  deleteAccount,
  signOut,
  updateProfilePicture
} = userSlice.actions;

export default userSlice.reducer;
