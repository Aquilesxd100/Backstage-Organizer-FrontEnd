import { WeeklyTasksData } from "../types/types";
import { ContentBox } from "./ContentStyles";

interface IContentProps {
  weeklyTasksData: WeeklyTasksData
}

export default function Content({
  weeklyTasksData
}: IContentProps) {

  return (
    <ContentBox elevation={5}> 
    </ContentBox>
  )
}