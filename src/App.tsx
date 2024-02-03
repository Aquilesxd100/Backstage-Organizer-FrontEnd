import { Box } from "@mui/material";

import Header from "./components/Header";
import Content from "./components/Content";

import "./css/styles.css";
import { useEffect } from "react";
import { tryToGetSavedWeekData } from "./store/courseDataSlice";
import { useStoreDispatch } from "./store/store";

function App() {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(tryToGetSavedWeekData());
  }, [])

  return (
    <Box
      width="100%"
      minHeight="100vh"
    >
      <Header />
      <Content />
    </Box>
  );
}

export default App;
