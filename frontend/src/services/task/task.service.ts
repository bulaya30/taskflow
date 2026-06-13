import axios from "axios";
import instance, { AxiosError } from "@/api/axiosInstance";
import type { Task, TaskInputs } from "@/interfaces/task";
const handleError = (
  error: unknown,
  fallbackMessage: string
): never => {
  if (axios.isAxiosError(error)) {
    throw AxiosError(error, fallbackMessage);
  }

  throw new Error("Unexpected error occurred");
};

export const TaskServices = {

  createTask: async (task : TaskInputs) => {
    try {
      const res = await instance.post(`users/tasks`, task);
      return res.data;
    } catch (error) {
      handleError(error, "Failed to fetch tasks");
    }
  },
  getTasks: async () : Promise<Task[]> => {
    const res = await instance.get(`users/tasks`);
    return res.data ?? []as Task[];
  },
  getTaskById: async (id: string) : Promise<Task> => {
    const res = await instance.get(`/tasks/${id}`);
    return res.data as Task;
  },
  updateTask: async (id : string | number, data : Partial<Task>) => {
    try {
      const res = await instance.put(`users/tasks/${id}`, data);
      return res.data;
    } catch (error) {
      handleError(error, "Failed to fetch tasks");
    }
  },
  compleleteTask: async (id : string | number) => {
    try {
      const res = await instance.patch(`users/tasks/${id}/complete`);
        return res.data;
      } catch (error) {
        handleError(error, "Failed to fetch tasks");
    }
  },
  deleteTask: async (id : string | number) => {
    try {
      const res = await instance.delete(`users/tasks/${id}`);
        return res.data;
      } catch (error) {
        handleError(error, "Failed to fetch tasks");
    }
  },
};