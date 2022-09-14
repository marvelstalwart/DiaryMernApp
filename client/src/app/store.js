import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import entrySlice from "../features/entries/entrySlice"
export default configureStore({
    reducer:{
        auth: authSlice,
        entries: entrySlice,
    }
})