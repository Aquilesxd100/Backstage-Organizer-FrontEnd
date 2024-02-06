import { useEffect } from "react";

import { Box } from "@mui/material";

import Header from "./components/Header";
import Content from "./components/Content";

import "./css/styles.css";
import { tryToGetSavedWeekData } from "./store/courseDataSlice";
import { useStoreDispatch } from "./store/store";
/* import pdfDataTXTConverter from "./utils/pdfDataTXTConverter/pdfDataTXTConverter"; */

function App() {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(tryToGetSavedWeekData());
    /* console.log(JSON.stringify(pdfDataTXTConverter())) */
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
