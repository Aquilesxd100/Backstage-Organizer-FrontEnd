import { Box } from "@mui/material";

import Header from "./components/Header";
import Content from "./components/Content";

import "./css/styles.css";
import { useState } from "react";
import { WeeklyTasksData } from "./types/types";

function App() {
  const [weeklyTasksData, setWeeklyTasksData] = 
    useState<WeeklyTasksData>(weeklyTasksDataMock);

  return (
    <Box
      width="100%"
      minHeight="100vh"
    >
      <Header startWeekDate={weeklyTasksData.startDate} />
      <Content weeklyTasksData={weeklyTasksData} />
    </Box>
  );
}

export default App;
