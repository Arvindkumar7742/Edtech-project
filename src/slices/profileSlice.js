import { createSlice } from "@reduxjs/toolkit";

const intialState ={
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading:false,
}
const profileSlice = createSlice({
    name:"profile",
    initialState:intialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        setLoading:(state,action)=>{
            state.token = action.payload;
        }
    }
})

export const { setUser } = profileSlice.actions
export default profileSlice.reducer