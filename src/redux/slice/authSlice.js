import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice ({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default authSlice;
export const { setIsAuthenticated, setUser } = authSlice.actions;
