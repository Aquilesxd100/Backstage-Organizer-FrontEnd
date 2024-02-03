import { useSelector } from "react-redux";
import { ContentBox } from "./ContentStyles";
import { RootState, useStoreDispatch } from "../store/store";
import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import WeekModal from "./WeekModal";
import { Fragment, useEffect, useState } from "react";
import { changeTaskDoneStatusByIndex, saveWeekOnLocalStorage } from "../store/courseDataSlice";

export default function Content() {
  const dispatch = useStoreDispatch();

  const { currentWeekData } = useSelector((state: RootState) => state.courseData)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeTaskDoneStatus = (
    taskIndex: number
  ) => {
    dispatch(changeTaskDoneStatusByIndex(taskIndex));
  }

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
          <Box 
            display="flex"
            flexWrap="wrap"
          >
            {
              currentWeekData.tasks.map((task, index) => (
                <Fragment key={index}>
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        checked={task.isDone}
                        onChange={() => handleChangeTaskDoneStatus(index)}
                        color="success" 
                      />
                    } 
                    label={task.title} 
                  />
                </Fragment>
              ))
            }
          </Box>
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