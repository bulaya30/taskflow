import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { Task } from "@/interfaces/task";

export const exportTasksPdf = (tasks: Task[]) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("TaskFlow", 14, 18);

  doc.setFontSize(11);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    28
  );

  autoTable(doc, {
    startY: 38,

    head: [
      [
        "Title",
        "Priority",
        "Due Date",
        "Status",
      ],
    ],

    body: tasks.map((task) => [
      task.title,
      task.priority,
      task.dueDate || "No deadline",
      task.completed ? "Completed" : "Pending",
    ]),
  });

  doc.save("taskflow-tasks.pdf");
};