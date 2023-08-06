import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
   url:{},
   genres:{}
  },
  reducers: {
   setApiConfiguration:(state,action)=>{
    state.url =action.payload;
   },
   setGenres: (state,action)=>{
    state.url=action.payload;
   }
  },
})

// Action creators are generated for each case reducer function
export const { setApiConfiguration, setGenres } = homeSlice.actions

export default homeSlice.reducer