import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { payload } = action;
      state.isLoggedIn = payload;
    },
    setUserName: (state, action) => {
      const { payload } = action;
      localStorage.setItem("name", JSON.stringify(payload));
      state.name = payload;
    },
    setUserInfo: (state, action) => {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const { setLogin, setUserName, setUserInfo } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserName = (state) => state.auth.name;
export const selectUserInfo = (state) => state.auth.user;

export default authSlice.reducer;
