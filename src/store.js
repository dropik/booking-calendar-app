import { configureStore } from "@reduxjs/toolkit";
import horizontalScrollReducer from './horizontalScrollSlice';

export default configureStore({
  reducer: {
    horizontalScroll: horizontalScrollReducer
  }
});