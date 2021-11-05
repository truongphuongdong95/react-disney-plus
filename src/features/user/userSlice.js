import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name:"",
    email:"",
    photo:"",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setLogin: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
        },
        setLogout: (state) => {
            state.name = null;
            state.email = null;
            state.photo = null;
        }
    }

})

export const {setLogin, setLogout} = userSlice.actions;

export const selectNameLogin = (state) => state.user.name;

export const selectEmailLogin = (state) => state.user.email;

export const selectPhotoLogin = (state) => state.user.photo;

export default userSlice.reducer;