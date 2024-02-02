import { Typography } from "@mui/material";

import { HeaderBox } from "./HeaderStyles";

export default function Header() {


  return (
    <HeaderBox 
      component="header"
    >
      <Typography 
        color="#00ECDA"
        sx={{
          textShadow: "0 0 4px #000000;" 
        }}
        variant="h3"
        fontFamily="fantasy"
      >
        Backstage Organizer
      </Typography>
    </HeaderBox>
  )
}