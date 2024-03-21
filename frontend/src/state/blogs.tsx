import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Blog = {
    title: string;
    content: string;
    imgLink: string;
    author: string;   
    published:boolean,
    date: string;
    id?: string;
}

type BlogState = Blog[];

const initialState:BlogState = [];

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        setBlogs: (_, action:PayloadAction<BlogState>) => {
                return action.payload;
        },
        addBlog: (state, action:PayloadAction<Blog>) => {
                return [...state, action.payload];
        },
    },
});

export const {setBlogs, addBlog} = blogSlice.actions;
export default blogSlice.reducer;