import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user,
    error: false,
    success: false,
    loading: false,
    message: ''
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
})

export default userSlice.reducer