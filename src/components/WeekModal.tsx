import { useEffect, useState } from "react";

import { Box, Button, Divider, Modal, TextField, Typography } from "@mui/material";

import { useSelector } from "react-redux";

import { RootState, useStoreDispatch } from "../store/store";
import { WeekModalBox } from "./WeekModalStyles";
import { fillCourseDataBase, setWeekDataByNumber } from "../store/courseDataSlice";

interface IWeekModalProps {
  isModalOpen: boolean
  setIsModalOpen: (status: boolean) => void
}

function WeekModal({
  isModalOpen,
  setIsModalOpen
} : IWeekModalProps) {
  const dispatch = useStoreDispatch();
  
  const { courseDataBase, currentWeekData } = useSelector((state: RootState) => state.courseData)

  const [weekNumber, setWeekNumber] = useState(0);

  useEffect(() => {
    if (currentWeekData && currentWeekData.weekNumber < 30) {
      setWeekNumber(currentWeekData.weekNumber + 1)
    } else {
      setWeekNumber(0)
    }
  }, [isModalOpen])

  const handleWeekSubmit = () => {
    if(!courseDataBase) 
      dispatch(fillCourseDataBase())

    dispatch(setWeekDataByNumber(weekNumber));
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={()=> setIsModalOpen(false)}
    >
      <WeekModalBox>
        <Typography
          sx={{
            textAlign: "center",
            m: 1,
            textShadow: "1px 1px 1px #000000;"
          }}
          color="#1DD3C6"
          variant="h4"
          fontFamily="fantasy"
        >
          Iniciar Nova Semana
        </Typography>    
        <Divider />    
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={3}
        >
          <TextField
            label="Nº da Semana"
            type="number"
            value={weekNumber}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const convertedNumber = Number(event.target.value);

              if (
                convertedNumber <= 30 
                && convertedNumber >= 0
              ) {
                setWeekNumber(convertedNumber);
              }
            }}
          /> 
          <Box mt={4}>
            <Button 
              sx={{
                mr: 1
              }}
              variant="contained" 
              color="success"
              onClick={()=> handleWeekSubmit()}
            >
              Iniciar
            </Button> 
            <Button 
              variant="contained" 
              color="error"
              onClick={()=> setIsModalOpen(false)}
            >
              Cancelar
            </Button> 
          </Box>        
        </Box>
      </WeekModalBox>
    </Modal>
  )
}

export default WeekModal;