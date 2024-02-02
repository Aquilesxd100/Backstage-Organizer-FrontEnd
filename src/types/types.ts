export interface WeeklyTasksData {
  weekNumber: number
  weekTitle: string
  startDate: string
  tasks: WeeklyTask[]
}

interface WeeklyTask {
  title: string
  description: string
  isDone: boolean  
}