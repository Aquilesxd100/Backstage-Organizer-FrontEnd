import { useSelector } from "react-redux";
import { ContentBox, TaskBox } from "./ContentStyles";
import { RootState, useStoreDispatch } from "../store/store";
import { Box, Button, Checkbox, Divider, FormControlLabel, Typography } from "@mui/material";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import WeekModal from "./WeekModal";
import { useEffect, useState } from "react";
import { changeTaskDoneStatusByIndex, clearCurrentWeek, saveWeekOnLocalStorage, setWeekDataByNumber } from "../store/courseDataSlice";

export default function Content() {
  const dispatch = useStoreDispatch();

  const { currentWeekData } = useSelector((state: RootState) => state.courseData)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeTaskDoneStatus = (
    taskIndex: number
  ) => {
    // Atualiza o state de acordo
    dispatch(changeTaskDoneStatusByIndex(taskIndex));
  }

  const handleNextWeek = () => {
    if (currentWeekData) {
      dispatch(setWeekDataByNumber(currentWeekData?.weekNumber + 1))
    }
  };

  useEffect(() => {
    if (currentWeekData) {
      dispatch(saveWeekOnLocalStorage());
    }
  }, [currentWeekData])
  
  return (
    <ContentBox elevation={5}> 
      {
        currentWeekData 
        ?
        <>
          <Box 
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
          >
            {
              currentWeekData.tasks.map((task, index) => (
                <TaskBox 
                  key={index}
                  onClick={() => handleChangeTaskDoneStatus(index)}
                >
                  <Box
                    sx={{
                      pointerEvents: "none",
                      backgroundColor: "#EBEBEB"
                    }}
                  >
                    <FormControlLabel 
                      sx={{
                        px: 0.8,
                        py: 0.3,
                        "&& svg": {
                          color: "#2e7d32"
                        },
                        "&& span": {
                          color: "#33FFF0",
                          letterSpacing: "0.45px",
                          fontFamily: "fantasy",
                          fontSize: "20px",
                          textShadow: "-1px -1px 2px rgba(0, 0, 0, 0.5), 1px -1px 2px rgba(0, 0, 0, 0.5),-1px 1px 2px rgba(0, 0, 0, 0.5), 1px 1px 2px rgba(0, 0, 0, 0.5)"
                        }
                      }}
                      control={
                        <Checkbox 
                          checked={task.isDone}
                          color="success" 
                        />
                      } 
                      label={task.title} 
                    />
                  </Box>
                  <Divider 
                    sx={{
                      borderWidth: "2px",
                      borderColor: "#00A99D"
                    }} 
                  />
                  <Box
                    minHeight="30px"
                  >
                    {
                      task.descriptionItems.map((item, index2) => (
                        <Box 
                          display="flex"
                          alignItems="center"
                          key={item + index2} 
                          m={0.8}
                        >
                          <Typography
                            fontFamily="arial"
                            color="#FA6125"
                            fontWeight="bold"
                            fontSize="13px"
                            sx={{
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2);"
                            }}
                          >
                            {
                              item
                            }
                          </Typography>
                        </Box>
                      ))
                    }
                  </Box>
                </TaskBox>
              ))
            }
          </Box>
          <Box 
            width="100%"
            display="flex"
            justifyContent="end"
            mt={1}
            p={1}
          >
            <Button 
              variant="contained" 
              color="error"
              onClick={()=>dispatch(clearCurrentWeek())}
              sx={{ mr: 1 }}
            >
              Cancelar
            </Button>
            {
              currentWeekData.weekNumber < 30 &&
              <Button 
                disabled={currentWeekData?.tasks.some((task) => !task.isDone)}
                variant="contained" 
                color="success"
                onClick={()=> handleNextWeek()}
              >
              Próxima Semana
            </Button>
            }
          </Box>          
        </>
        :
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              sx={{
                textAlign: "center",
                m: 2,
                maxWidth: "600px",
                textShadow: "1px 1px 1px #000000;"
              }}
              color="#6BD568"
              variant="h4"
              fontFamily="impact"
            >
              Você ainda não começou uma semana, clique no botão abaixo para iniciar.
            </Typography>
            <Button 
              variant="contained" 
              color="success"
              endIcon={<LibraryBooksIcon />}
              onClick={()=>setIsModalOpen(true)}
            >
              Nova Semana
            </Button>
          </Box>
      }
      <WeekModal 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
      />
    </ContentBox>
  )
}