import { Box, Paper } from "@mui/material";

import styled from "@emotion/styled";

import { defaultTheme } from "../theme";

export const ContentBox = styled(Paper)({
  width: `calc(100% - ${defaultTheme.spacing(3)})`,
  minHeight: `calc(100vh - 120px - ${defaultTheme.spacing(3)})`,
  padding: defaultTheme.spacing(1),
  margin: defaultTheme.spacing(1.5),
})
