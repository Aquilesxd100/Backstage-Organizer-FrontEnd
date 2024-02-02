import { Box } from "@mui/material";

import Header from "./components/Header";
import Content from "./components/Content";

import "./css/styles.css";
import { useState } from "react";
import { WeeklyTasksData } from "./types/types";

const weeklyTasksDataMock : WeeklyTasksData = {
  weekNumber: 1,
  weekTitle: "I will study more",
  startDate: "2017-05-24",
  tasks: [
    {
      isDone: false,
      title: " titulo 1",
      description: "teste descricao"
    },
    {
      isDone: false,
      title: " titulo 2",
      description: "teste descricao2"
    },
    {
      isDone: false,
      title: " titulo 3",
      description: "teste descricao3"
    },
    {
      isDone: false,
      title: " titulo 4",
      description: "teste descricao4"
    },
  ]
}

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
