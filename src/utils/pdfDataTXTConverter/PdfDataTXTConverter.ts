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
      let lastTaskWasDuplicated = false;
      
      const currentTask : WeeklyTask = {
        title: "",
        description: "",
        isDone: false
      }
      strLines.forEach((line, idx) => {
        // Pula linhas não relacionadas a tarefas
        if (idx < initialPosition || !line.length)
          return;

        // Se ultima tarefa se repete, não a adiciona na lista de novo
        if (!lastTaskWasDuplicated) {
          // Guarda as informações da tarefa se for uma nova (":" indica titulo)
          // mas não é a primeira ou se for o ultima linha           
          if (
            (
              (line[line.length - 1] === ":" 
              && idx > initialPosition)
              || idx === strLines.length - 1
            )
          ) {
            weekTasks.push(structuredClone(currentTask));
            currentTask.description = "";
          }          
        } else {
          lastTaskWasDuplicated = false;
        }
        // FALTA PULAR A ADICAO DA PRIMEIRA VERSAO ORIGINAL DA TAREFA
        // QUE É DUPLICADA

        // Preenche o titulo da tarefa
        if (line[line.length - 1] === ":") {
          currentTask.title = line.substring(0, line.length - 1);
        } else {
          // Verifica se a descrição indica que a tarefa se repete
          const isAnDuplicate = 
            line.includes("Parte") 
            && line.substring(6, line.length).includes("Parte");

          if(!isAnDuplicate) {
            currentTask.description = line;
          } else { 
            lastTaskWasDuplicated = true;
            // Separa a linha em tarefas separadas
            const separatedLines : string[] = line.split("Parte")
              // Filtra pedaços de texto vazios que sobraram
              .filter((sepLine) => sepLine.trim().length)

            separatedLines.forEach((sepLine, idx) => {
              // Corta a descrição de cada uma das tarefas
              const descriptionStartIndex = sepLine.indexOf(".") + 2;
              const processedDescription = sepLine.substring(descriptionStartIndex);

              // Adiciona as tarefas na lista
              weekTasks.push({
                title: `${currentTask.title} ${idx + 1}`,
                description: processedDescription,
                isDone: false
              });
            })
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

    // Adição de tarefas não incluidas no PDF
    // que são padrão de cada semana
    for (let c = 1; c < 4; c++) {
      weekTasks.push({
        title: `Just Do It ${c}`,
        description: "",
        isDone: false
      })
    }
    weekTasks.push({
      title: "Independent reading",
      description: "",
      isDone: false
    })

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