import { CourseDataBase, WeeklyTask, WeeklyTasksData } from "../../types/types";
import { pdfDataTXT } from "./pdfDataTXT";

export default function pdfDataTXTConverter(): CourseDataBase {
  const rawDataString : string = pdfDataTXT;

  const convertedData: WeeklyTasksData[] = [];

  const separatedWeeksStr : string[] = [];

  // Separa a string gigantesca em strings menores de cada semana
  rawDataString.split('\n\n\n\n\n\n').forEach((rawStr) => {
    // Filtra para não pegar trechos de string vazios ou inválidos
    if(rawStr.length > 80) {
      const dividerFactor = "EMENTA DO CURSO";
      const initialDividerPosition = rawStr
        .indexOf(dividerFactor) + dividerFactor.length;

      const weekStringContent = rawStr.substring(
        initialDividerPosition,
        rawStr.length
      ).trim();
      
      separatedWeeksStr.push(weekStringContent)
    }
  });

  separatedWeeksStr.forEach((weekStr, index) => {
    // Valores default para semana inicial que foge do padrão
    let weekNumber: string = '0';
    let weekTitle: string = 'Intro';
    const weekTasks: WeeklyTask[] = [];

    const strLines: string[] = weekStr.split('\n');

    // Função de prenchimento das tarefas da semana
    const fillWeekTasks = (initialPosition: number) => {
      const currentTask : WeeklyTask = {
        title: "",
        descriptionItems: [],
        isDone: false
      }
      strLines.forEach((line, idx) => {
        // Pula linhas não relacionadas a tarefas
        if (idx < initialPosition || !line.length)
          return;


        // Guarda as informações da tarefa se for uma nova (":" indica titulo)
        // mas não é a primeira ou se for o ultima linha 
        if (
          (line[line.length - 1] === ":" 
          && idx > initialPosition)
          || idx === strLines.length - 1
        ) {
          weekTasks.push(structuredClone(currentTask));
          currentTask.descriptionItems = [];
        }

        // Preenche o titulo da tarefa
        if (line[line.length - 1] === ":") {
          currentTask.title = line.substring(0, line.length - 1);
        } else {
          // Verifica se a linha de descrição esta duplicada
          // e faz o devido tratamento se for o caso
          const isDuplicatedLines = 
            line.includes("Parte") 
            && line.substring(6, line.length).includes("Parte");

          if(!isDuplicatedLines) {
            currentTask.descriptionItems.push(line);
          } else {
            // Separa a linha sem eliminar o separador "Parte"
            const separatedLines : string[] = line.split(/(?=Parte)/g);
            
            separatedLines.forEach((spLine) => 
              currentTask.descriptionItems.push(spLine.trim())
            )
          }
        }
      })
    }

    if (strLines[0].substring(0, 7) === "Unidade") {
      let idxEndWeekNumber = 9;
      if (index > 9) {
        idxEndWeekNumber = 10;
      }
      weekNumber = strLines[0].substring(8, idxEndWeekNumber);
    
      // Popular o título da semana baseado na quantidade
      // de caracteres na primeira linha
      if (strLines[0].length > idxEndWeekNumber) {
        weekTitle = strLines[0].substring(idxEndWeekNumber + 1, strLines[0].length)
        fillWeekTasks(1);
      } else {
        weekTitle = strLines[1];
        fillWeekTasks(2);
      }
    } else {
      // Case da semana fora do padrão "Intro"
      fillWeekTasks(1);
    }

    convertedData.push({
      weekNumber: Number(weekNumber),
      weekTitle: weekTitle,
      tasks: weekTasks
    })
  })

  return {
    weeklyTasksData: convertedData
  };
};