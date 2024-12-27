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
  data: ITask[]
}

export type GetTaskApiResponse = {
  success: boolean;
  data: ITask;
}

export type DeleteTaskApiResponse = {
  success: boolean;
  message: string;
}

export const getTaskStatusValues = (status: string) => {
  switch (status) {
    case "TODO":
      return "Not Started";
    case "IN_PROGRESS":
      return "In Progress";
    case "DONE":
      return "Completed";
    default:
      return status;
  }
}

export const getTaskColorStyles = (status: string) => {
  switch (status) {
    case "TODO":
      return { backgroundColor: "red", color: "white" };
    case "IN_PROGRESS":
      return { backgroundColor: "blue", color: "white" };
    case "DONE":
      return { backgroundColor: "green", color: "white" };
    default:
      return { backgroundColor: "black", color: "white" };
  }
}