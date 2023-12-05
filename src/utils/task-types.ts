export interface ITaskInput {
  title: string;
  description: string;
  status: string;
}

export interface ITask extends ITaskInput {
  _id: string;
}

export type GetTasksApiResponse = {
  success: boolean;
  tasks: ITask[]
}

export type GetTaskApiResponse = {
  success: boolean;
  task: ITask;
}

export type DeleteTaskApiResponse = {
  success: boolean;
  message: string;
}