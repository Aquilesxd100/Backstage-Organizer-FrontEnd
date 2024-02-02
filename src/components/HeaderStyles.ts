import { Box } from "@mui/material";

import styled from "@emotion/styled";

import fundoPapelInfinitoIMG from "../images/textura-papel-infinita.jpg";
import { defaultTheme } from "../theme";

export const HeaderBox = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: defaultTheme.spacing(2),
  borderBottom: "4px solid #00A99D",
  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.6)",
  backgroundImage: `url(${fundoPapelInfinitoIMG})`
});