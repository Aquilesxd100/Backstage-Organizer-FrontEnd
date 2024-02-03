import { Box, Fab, TextField, Typography } from "@mui/material";
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

import { HeaderBox, HeaderDateBox } from "./HeaderStyles";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentWeekData } = useSelector((state: RootState) => state.courseData)
  
  // Falta deixar quantidade de dias restantes para concluir
  // tarefa dinamicos e alterar cores de acordo

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
      <Box
        display="flex"
        flexDirection="column"
        sx={!currentWeekData?.startDate
          ? { opacity: 0, pointerEvents: "none"} 
          : {}
        }
      >
        <HeaderDateBox>
          <Box display="flex" width="100%">
            <TextField
              disabled={true}
              size="small"
              label="Início da Semana"
              type="date"
              value={!currentWeekData?.startDate}
            />
            <Box mx={1}>
              <Fab 
                color="warning" 
                aria-label="limpar"
                size="small"
                onClick={()=>{
                  //Abre modal para configurar nova semana
                  // modal vai pedir numero da semana somente para prencher
                }}
              >
                <RestartAltRoundedIcon fontSize="large" />
              </Fab>
            </Box>
          </Box>
          <Typography 
            fontFamily="sans-serif"
            mt={1}
            variant="body1"
            maxWidth="260px"
          >
            Você ainda tem 4 dias para concluir as tarefas dessa semana.
          </Typography>             
        </HeaderDateBox>     
      </Box>
    </HeaderBox>
  )
}