import { Box } from "@mui/material";

import Header from "./components/Header";

import "./css/styles.css";

function App() {
  const startWeekDate = "2017-05-24";

  return (
    <Box
      width="100%"
      minHeight="100vh"
    >
      <Header startWeekDate={startWeekDate} />
      <Box>

      </Box>
    </Box>
  );
}

export default App;
