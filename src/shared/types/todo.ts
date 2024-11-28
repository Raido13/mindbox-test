import { TodoStatus } from '@shared/enums/todoStatus';

export interface ITodo {
  id: string;
  todo: string;
  status: TodoStatus;
}
