import { Box, Fab, TextField, Typography } from "@mui/material";
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { toDate, differenceInDays } from "date-fns";

import { HeaderBox, HeaderDateBox } from "./HeaderStyles";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import WeekModal from "./WeekModal";

const convertDateToENFormat = (date: string | undefined) : string => {
  if(!date)
    return "";

  const year = date.substring(date.length - 4, date.length);
  const month = date.substring(3, 5);
  const day = date.substring(0, 2);

  return `${year}-${month}-${day}` 
}

const getRemainingDaysMessage = (date: string | undefined) : {
  message: string
  color: string
} => {
  const response = {
    message: "",
    color: ""
  };
  if (date) {
    const currentDate = new Date();

    const year = date.substring(date.length - 4, date.length);
    const month = date.substring(3, 5);
    const day = date.substring(0, 2);
    const startDate = new Date(
      Number(year), 
      Number(month) - 1, 
      Number(day), 
      currentDate.getHours(), 
      0, 
      0, 
      0
    );
    
    const differenceDays = differenceInDays(
      currentDate,
      startDate
    )

    const daysRemaining = 7 - differenceDays;
    if (daysRemaining >= 7) {
      response.message = `Você ainda tem ${daysRemaining} dias para concluir as tarefas dessa semana.`;
      response.color = "#00AE2C";
    } else if (daysRemaining === 0) {
      response.message = "Você só tem mais um dia para concluir as tarefas dessa semana.";
      response.color = "#FF9900";
    } else {
      response.message = `Você esta ${daysRemaining} dias atrasado nas tarefas dessa semana.`;
      response.color = "#FF0000";
    }
  }

  return response;
}

export default function Header() {
  const { currentWeekData } = useSelector((state: RootState) => state.courseData)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remainingDaysMessageObj, setRemainingDaysMessageObj] = useState({
    message: "",
    color: "#000000"
  })

  const remainingDaysHandler = () => {
    const remainingDaysObj = getRemainingDaysMessage(currentWeekData?.startDate);

    setRemainingDaysMessageObj(remainingDaysObj);
  }

  useEffect(() => {
    remainingDaysHandler()
  }, [currentWeekData?.startDate])

  return (
    <HeaderBox 
      component="header"
    >
      <Box 
        display="flex" 
        flexDirection="column"
      >
        <Typography 
          color="#00ECDA"
          sx={{
            textShadow: "0 0 4px #000000;",
            mb: 1
          }}
          variant="h3"
          fontFamily="fantasy"
        >
          Backstage Organizer
        </Typography>  
        {
          currentWeekData &&
            <Typography
            color="#FB7846"
            variant="h4"
            fontFamily="fantasy"
            sx={{
              textShadow: "1px 1px 2px #000000;",
            }}
          >
            {`#${currentWeekData.weekNumber} ${currentWeekData.weekTitle}`}
          </Typography>
        }      
      </Box>
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
              value={convertDateToENFormat(currentWeekData?.startDate)}
              InputLabelProps={{
                shrink: !!currentWeekData?.startDate
              }}
            />
            <Box mx={1}>
              <Fab 
                color="warning" 
                aria-label="limpar"
                size="small"
                onClick={()=>setIsModalOpen(true)}
              >
                <RestartAltRoundedIcon fontSize="large" />
              </Fab>
            </Box>
          </Box>
          <Typography 
            color={remainingDaysMessageObj.color}
            fontFamily="sans-serif"
            mt={1}
            variant="body1"
            maxWidth="260px"
          >
            {remainingDaysMessageObj.message}
          </Typography>             
        </HeaderDateBox>     
      </Box>
      <WeekModal 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
      />
    </HeaderBox>
  )
}