import { Task } from "../../interfaces/task.js";

import TaskRepository from "@/repositories/taskRepository.js";
import NotificationRepository from "@/repositories/notificationRepository.js";

import { enrichTask } from "./taskMapper.js";


type CreateTaskInput = Omit<Task, "id" | "userId">

export default class TaskService {
   constructor(
        private taskRepository: TaskRepository,
        private notificationRepository: NotificationRepository
    ) {}
  
  /* ===================== VERIFY TASK OWNERSHIP ===================== */
  private async verifyTaskOwnership(
    userId: string,
    taskId: string
  ): Promise<Task> {

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    if (task.userId !== userId) {
        throw new Error("Unauthorized");
    }

    return task;
  }

  async getTasks(): Promise<Task[]> {

    const tasks = await this.taskRepository.findAll();

    return tasks.map(enrichTask);

  }

  async getUserTasks(userId: string): Promise<Task[]> {

    const tasks = await this.taskRepository.findByUser(userId);

    if (!tasks) {
        return [];
    }

    return tasks.map(enrichTask);

  }
  async getTaskById(
    userId: string,
    id: string
): Promise<Task> {

    if (!userId) {
        throw new Error("User id is required");
    }

    if (!id) {
        throw new Error("Task id is required");
    }

    const task = await this.verifyTaskOwnership(userId, id);

    return enrichTask(task);

  }

  async createTask(
    userId: string,
    task: CreateTaskInput
  ): Promise<Task> {

    if (!userId) {
        throw new Error("User id is required");
    }
    if (!task) {
        throw new Error("Task data is required");
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    if (dueDate < today) {
        throw new Error("Due date cannot be in the past");
    }
    const tasks = await this.taskRepository.findByUser(userId);
    
    if (task.priority === "HIGH") {
        const existingHighPriority = tasks.find(
            task =>
                task.priority === "HIGH" &&
                task.active &&
                !task.completed
        );
        if (existingHighPriority) {
            throw new Error(
                "You can only have one high priority task at a time."
            );
        }
    }
    return await this.taskRepository.create({
        ...task,
        userId,
        active: true,
    });

  }
  async updateTask(
    userId: string,
    id: string,
    data: Partial<Task>
    ): Promise<boolean> {

    if (!userId) {
        throw new Error("User id is required");
    }

    if (!id) {
        throw new Error("Task id is required");
    }

    if (Object.keys(data).length === 0) {
        throw new Error("No update data provided");
    }

    const task = await this.verifyTaskOwnership(userId, id);

    if (task.completed) {
        throw new Error("Cannot update a completed task");
    }

    return this.taskRepository.update(id, data);

  }
  async completeTask(
    userId: string,
    id: string
    ): Promise<boolean> {

    const task = await this.verifyTaskOwnership(userId, id);

    if (task.completed) {
        throw new Error("Task is already completed");
    }

    return await this.taskRepository.update(id, {
        completed: true,
    });

  }

  async deleteTask(
    userId: string,
    id: string
    ): Promise<boolean> {

    await this.verifyTaskOwnership(userId, id);
    
    await this.notificationRepository.deleteByTask(id);

    await this.taskRepository.delete(id);

    return true;

  }

  async resetAllTasks(uid: string): Promise<boolean> {

    if (!uid) {
        throw new Error("User id is required");
    }

    return await this.taskRepository.reset(uid);

  }
}
