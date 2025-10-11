import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        status: 'checking',
        uid: null,
        email: null,
        displayName: null,
        photoUrl: null,
        errorMessage: null
    },
    reducers:{
        register: (state, action) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid || null;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName || null;
            state.photoUrl = action.payload.photoURL || null;
            state.errorMessage = null;
        },
        logout: (state, action) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoUrl = null;
            state.errorMessage = action?.payload?.errorMessage || null;
        },
        checkingCredentials: (state, action) =>{
            console.log('checking')
        }
    }
})

export const { register, logout, checkingCredentials} = authSlice.actions