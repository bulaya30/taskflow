import {
  createContainer,
  asClass,
  InjectionMode,
} from "awilix";

import TaskController from "@/controllers/taskController.js";
import UserController from "@/controllers/userController.js";
import NotificationController from "@/controllers/notificationController.js";
import SettingController from "@/controllers/settingController.js";

import TaskRepository from "@/repositories/taskRepository.js";
import UserRepository from "@/repositories/userRepository.js";
import NotificationRepository from "@/repositories/notificationRepository.js";
import SettingsRepository from "@/repositories/settingsRepository.js";

import TaskService from "@/services/tasks/taskService.js";
import UserService from "@/services/users/userService.js";
import NotificationService from "@/services/notifications/notificationService.js";
import SettingService from "@/services/settings/settingService.js";

import TaskReminder from "@/jobs/taskReminder.js";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  // Repositories
  taskRepository: asClass(TaskRepository).singleton(),
  userRepository: asClass(UserRepository).singleton(),
  notificationRepository: asClass(NotificationRepository).singleton(),
  settingsRepository: asClass(SettingsRepository).singleton(),

  // Jobs
  taskReminder: asClass(TaskReminder).singleton(),

  // Services
  taskService: asClass(TaskService).scoped(),
  userService: asClass(UserService).scoped(),
  notificationService: asClass(NotificationService).scoped(),
  settingService: asClass(SettingService).scoped(),

  // Controllers
  taskController: asClass(TaskController).scoped(),
  userController: asClass(UserController).scoped(),
  notificationController: asClass(NotificationController).scoped(),
  settingController: asClass(SettingController).scoped(),
});

export default container;