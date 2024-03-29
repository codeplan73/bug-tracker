import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
  message: '', 
}
 
// register user
export const register = createAsyncThunk(
  'auth/register',  
  async (user, thunkAPI) => {
    try {
      return await authService.register(user) 
    } catch (error) {
      const message = error.response.data.msg
        // (error.response &&
        //   error.response.data &&
        //   error.response.data.message) ||
        // error.message ||
        // error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
 
// login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = error.response.data.msg
      // (error.response && error.response.data && error.response.data.message) ||
      // error.message ||
      // error.toString(

    return thunkAPI.rejectWithValue(message)
  }
})

// logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.error = false
      state.success = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
      state.loading = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = false
      state.user = action.payload
      state.message = ''
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.user = null
      state.message = action.payload
    })
    .addCase(register.pending, (state) => {
        state.loading = true
    })
    .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.success = true
        state.user  = action.payload
        state.message = ''
    })
    .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.user = null
        state.message = action.payload
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null
      state.message = ''
      state.loading = false
      state.error = false 
    })
  },
})

// export const {clearCart, removeItem, increase, decrease, calculateTotal} = cartSlice.actions
export const { reset } = authSlice.actions
export default authSlice.reducer
 