import { configureStore } from "@reduxjs/toolkit";
import courseDataReducer from "./courseDataSlice";
import { useDispatch } from "react-redux";

const store = configureStore ({
  reducer: {
    courseData: courseDataReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type CourseDataStore = typeof store.dispatch;
export const useStoreDispatch: () => CourseDataStore = useDispatch;
export default store;