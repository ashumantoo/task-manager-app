import axios from 'axios';
import {
  DeleteTaskApiResponse,
  GetTaskApiResponse,
  GetTasksApiResponse,
  ITaskInput
} from './task-types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'
const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`
});

export const taskApi = {
  createTask: (task: ITaskInput) => axiosInstance.post<GetTaskApiResponse>('/task', task),
  getTasks: () => axiosInstance.get<GetTasksApiResponse>('/task'),
  getTask: (taskId: string) => axiosInstance.get<GetTaskApiResponse>(`/task/${taskId}`),
  updateTask: (taskId: string, task: ITaskInput) => axiosInstance.put<GetTaskApiResponse>(`/task/${taskId}`, task),
  deleteTask: (taskId: string) => axiosInstance.delete<DeleteTaskApiResponse>(`/task/${taskId}`)
}