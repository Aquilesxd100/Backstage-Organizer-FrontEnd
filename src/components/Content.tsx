
import { WeeklyTasksData } from "../types/types";
import getPDFData from "../utils/pdfExtraction/pdfDataExtraction";
import { ContentBox } from "./ContentStyles";

interface IContentProps {
  weeklyTasksData: WeeklyTasksData
}

export default function Content({
  weeklyTasksData
}: IContentProps) {

  return (
    <ContentBox elevation={5}> 
      <button onClick={async ()=>{ await getPDFData()}}>
        GERAR DADOS
      </button>
    </ContentBox>
  )
}