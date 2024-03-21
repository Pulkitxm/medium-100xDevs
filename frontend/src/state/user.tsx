import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string|undefined;
  email: string|undefined;
  token: string|undefined;
}

const initialState: UserState = {
  name: undefined,
  email: undefined,
  token: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      const { name, email, token } = action.payload;
      if (name) state.name = name;
      if (email) state.email = email;
      if (token) state.token = token;
    },
    reSetUser: () => {
      return {
        name: "",
        email: "",
        token: "",
      };
    },
  },
});

export const { setName, setEmail, setToken, setUser, reSetUser } = userSlice.actions;
export default userSlice.reducer;