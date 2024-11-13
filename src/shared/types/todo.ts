import { TaskStatus } from "@shared/enums/taskStatus";

export interface ITodo {
  id: string;
  task: string;
  status: TaskStatus;
}
