import { Box, Paper } from "@mui/material";

import styled from "@emotion/styled";

import { defaultTheme } from "../theme";

export const ContentBox = styled(Paper)({
  width: `calc(100% - ${defaultTheme.spacing(3)})`,
  minHeight: `calc(100vh - 180px - ${defaultTheme.spacing(3)})`,
  padding: defaultTheme.spacing(1),
  margin: defaultTheme.spacing(1.5),
});

export const TaskBox = styled(Box)({
  cursor: "pointer",
  userSelect: "none",
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
  boxShadow: "2px 2px 1px rgba(0, 0, 0, 0.6)",
  margin: defaultTheme.spacing(1),
  width: "25%",
  minWidth: "200px",
  border: "3px solid #00A99D",
  borderRadius: "8px",
  "&:hover": {
    filter: "brightness(0.93)",
    transform: "scale(1.05)"
  }
});
