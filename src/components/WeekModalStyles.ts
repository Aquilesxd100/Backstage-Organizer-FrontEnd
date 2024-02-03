import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { defaultTheme } from "../theme";

export const WeekModalBox = styled(Box)({
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: "#DDDDDD",
  border: '4px solid #00A99D',
  paddingTop: defaultTheme.spacing(2),
  paddingRight: defaultTheme.spacing(4),
  paddingLeft: defaultTheme.spacing(4),
  paddingBottom: defaultTheme.spacing(3),
  boxShadow: "2px 2px 1px rgba(0, 0, 0, 0.6)",
})
