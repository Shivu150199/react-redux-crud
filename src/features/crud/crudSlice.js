import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

//create action

const initialState = {
  users: [],
  loading: false,
  error: null,
}

export const showUser = createAsyncThunk('showUser', async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/get`)

    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const singleUser = createAsyncThunk('showUser', async (id,thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/get/${id}`)

    return response.data
  } catch (error) {
   return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const createUser = createAsyncThunk(
  'createUser',
  async (initialPost, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/post`,
        initialPost
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const deleteContact = createAsyncThunk(
  'deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/remove/${id}`
      )
      const result = await response.json()
      return result
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const userDetail = createSlice({
  name: 'userDetail',
  initialState,
  reducer:{
    handleInputChange:(state,action)=>{
console.log(state+""+action)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload)
      })
      .addCase(createUser.rejected, (state, {payload}) => {
        state.loading = false
        toast.error(payload)
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true
      })

      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(showUser.rejected, (state, {payload}) => {
        state.loading = false
        toast.error (payload)
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false
        const { id } = action.payload
        if (id) {
          state.users = state.users.filter((user) => user.id !== id)
        }
      })
      .addCase(deleteContact.rejected, (state, {payload}) => {
        state.loading = false
        toast.error(payload)
      })
  },
})

export default userDetail.reducer
