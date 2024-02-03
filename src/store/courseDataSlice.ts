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
    },
    saveWeekOnLocalStorage: (state) => {
      const currentWeekJSON = JSON.stringify(state.currentWeekData);

      localStorage.setItem(
        "courseSavedWeek", currentWeekJSON
      );
    },
    setWeekDataByNumber: (state, action: PayloadAction<number>) => {
      if (state.courseDataBase?.weeklyTasksData[action.payload]) {
        const currentDateInPTBRFormat = (new Date()).toLocaleDateString('pt-BR');

        state.currentWeekData = {
          ...state.courseDataBase?.weeklyTasksData[action.payload],
          startDate: currentDateInPTBRFormat
        };
      }
    },
    changeTaskDoneStatusByIndex: (state, action: PayloadAction<number>) => {
      // Inverte o valor guardado fazendo proveito de referência
      if(state.currentWeekData) {
        const taskToUpdate = state.currentWeekData.tasks[action.payload];
        taskToUpdate.isDone = !taskToUpdate.isDone;
      }
    }
  }
})

export const { 
  fillCourseDataBase, 
  tryToGetSavedWeekData, 
  saveWeekOnLocalStorage,
  setWeekDataByNumber, 
  changeTaskDoneStatusByIndex
} = courseDataSlice.actions;

export default courseDataSlice.reducer;