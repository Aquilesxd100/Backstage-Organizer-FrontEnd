import { useSelector } from "react-redux";
import { ContentBox } from "./ContentStyles";
import { RootState } from "../store/store";
import { Box, Button, Typography } from "@mui/material";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import WeekModal from "./WeekModal";
import { useState } from "react";

export default function Content() {
  const { currentWeekData } = useSelector((state: RootState) => state.courseData)

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <ContentBox elevation={5}> 
      {
        currentWeekData 
        ?
          <></>
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