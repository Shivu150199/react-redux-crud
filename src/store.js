import { configureStore } from '@reduxjs/toolkit';
import userDetail from './features/crud/crudSlice'

export  const store=configureStore({
    reducer:{
        crud:userDetail,
    },
})