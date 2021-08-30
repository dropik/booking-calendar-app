import { configureStore } from "@reduxjs/toolkit";
import currentDateReducer from './currentDateSlice';

export default configureStore({
  reducer: {
    currentDate: currentDateReducer
  }
});