export interface CourseDataBase {
  weeklyTasksData: WeeklyTasksData[]
}

export interface WeeklyTasksData {
  weekNumber: number
  weekTitle: string
  startDate?: string
  tasks: WeeklyTask[]
}

export interface WeeklyTask {
  title: string
  descriptionItems: string[]
  isDone: boolean  
}