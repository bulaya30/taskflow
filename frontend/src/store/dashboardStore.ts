import { create } from "zustand";
import type { Task } from "@/interfaces/task";

type Filter = "all" | "pending" | "completed";

type DashboardStore = {
  search: string;
  filter: Filter;

  selectedTask: Task | null;
  editingTask: Task | null;

  drawerOpen: boolean;

  setSearch: (value: string) => void;
  setFilter: (value: Filter) => void;

  setSelectedTask: (task: Task | null) => void;
  setEditingTask: (task: Task | null) => void;

  openDrawer: () => void;
  closeDrawer: () => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  search: "",
  filter: "all",

  selectedTask: null,
  editingTask: null,

  drawerOpen: false,

  setSearch: (search) => set({ search }),

  setFilter: (filter) => set({ filter }),

  setSelectedTask: (selectedTask) => set({ selectedTask }),

  setEditingTask: (editingTask) => set({ editingTask }),

  openDrawer: () => set({ drawerOpen: true }),

  closeDrawer: () => set({ drawerOpen: false }),
}));