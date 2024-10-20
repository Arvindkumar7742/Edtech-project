import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: intialState,
    reducers: {
        setToken (state, action) {
            state.token = action.payload
        },
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    }
})

export const { setToken, setSignupData, setLoading } = authSlice.actions
export default authSlice.reducer