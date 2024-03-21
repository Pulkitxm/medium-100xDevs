import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  error: string;
  show: boolean;
}

const initialState: UserState = {
  error: "",
  show: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setError: (state, action) => {
        state.error= action.payload;
    },
    reSetError: (state) => {
        state.error= "";
    },
    showError: (state,action) => {
        state.error= action.payload;
        state.show= true;
    },
    hideError: (state) => {
        state.error= "";
        state.show= false;
    },
  },
});

export const {showError, hideError, setError, reSetError} = userSlice.actions;
export default userSlice.reducer;