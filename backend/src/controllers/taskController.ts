import { Request, Response } from "express"
import TaskService from "@/services/tasks/taskService.js"
import { error } from "console"

export default class TaskController {
  
  constructor (private taskService: TaskService) {}

  async createTask(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const task = req.body
      const result = await this.taskService.createTask(userId, task)
      return res.status(201).json({
        ...result,
        success: true,
      })
    } catch (err: any) {
      console.log(err)
      return res.status(400).json({
        success: false,
        message: err.message
      })
    }
  }

  async getUserTasks(req: Request, res: Response) {
    try {

      const userId = req.user!.id

      const tasks = await this.taskService.getUserTasks(userId)

      return res.status(200).json(tasks)

    } catch (err: any) {
      return res.status(400).json({
        message: err.message
      })
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const id = req.params.id

      if(!id || Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid task id"
        })
      }

      const task = await this.taskService.getTaskById(userId, id)
      return res.status(200).json(task)
    } catch (err: any) {
      return res.status(400).json({
        message: err.message
      })
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const id = req.params.id
      const data = req.body

      if(!id || Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid task id"
        })
      }
      await this.taskService.updateTask(userId, id, data)
      return res.status(200).json({
        success: true,
        message: "Task updated"
      })
    } catch (err: any) {
        return res.status(400).json({
          success: false,
          message: err.message
      })
    }    
  }

  async completeTask(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const id = req.params.id

      if(!id || Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid task id"
        })
      }

      await this.taskService.completeTask(userId, id)
      return res.status(200).json({
        success: true,
        message: "Task completed"
      })
    } catch (err: any) {
        return res.status(400).json({
          success: false,
          message: err.message
      })
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const userId = req.user!.id
      const id = req.params.id

      if(!id || Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid task id"
        })
      }

      await this.taskService.deleteTask(userId, id)
      return res.status(200).json({
        success: true,
        message: "Task deleted"
      })
    } catch (err: any) {
        return res.status(400).json({
          success: false,
          message: err.message
      })
    }
  }

}

