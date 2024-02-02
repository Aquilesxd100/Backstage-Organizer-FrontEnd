import { Box } from "@mui/material";

import styled from "@emotion/styled";

import fundoPapelInfinitoIMG from "../images/textura-papel-infinita.jpg";
import { defaultTheme } from "../theme";

export const HeaderBox = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: defaultTheme.spacing(1),
  paddingRight: defaultTheme.spacing(2),
  paddingLeft: defaultTheme.spacing(2),
  borderBottom: "4px solid #00A99D",
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.6)",
  backgroundImage: `url(${fundoPapelInfinitoIMG})`
});

export const HeaderDateBox = styled(Box)({
  textAlign: "left",
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  boxShadow: "2px 1px 1px rgba(0, 0, 0, 0.5)",
  padding: defaultTheme.spacing(1),
  paddingTop: defaultTheme.spacing(1.5)
});