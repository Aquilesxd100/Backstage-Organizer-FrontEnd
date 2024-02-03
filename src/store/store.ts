import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import courseDataReducer from "./courseDataSlice";

const store = configureStore ({
  reducer: {
    courseData: courseDataReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type CourseDataStore = typeof store.dispatch;
export const useStoreDispatch: () => CourseDataStore = useDispatch;
export default store;