import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseDataBase, WeeklyTasksData } from "../types/types";
import { convertedCourseDataJSON } from "../utils/convertedCourseData";

interface ICourseDataState {
  courseDataBase: CourseDataBase | null
  currentWeekData: WeeklyTasksData | null
}

const initialState : ICourseDataState = {
  courseDataBase: null,
  currentWeekData: null
}

export const courseDataSlice = createSlice({
  name: "courseData",
  initialState,
  reducers: {
    fillCourseDataBase: (state) => {
      state.courseDataBase = JSON.parse(convertedCourseDataJSON);
    },
    tryToGetSavedWeekData: (state) => {
      const localStorageData = localStorage.getItem("courseSavedWeek");
      if (localStorageData)
        state.currentWeekData = JSON.parse(localStorageData)
    }
  }
})

export const { fillCourseDataBase, tryToGetSavedWeekData } = courseDataSlice.actions;
export default courseDataSlice.reducer;