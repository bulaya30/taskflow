export const getDaysLeft = (dueDate: string | Date): number => {
  const now = new Date()
  const due = new Date(dueDate)

  now.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)

  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export const isOverdue = (dueDate: string | Date) => {
  return getDaysLeft(dueDate) < 0;
};

export const isDueToday = (dueDate: string | Date) => {
  return getDaysLeft(dueDate) === 0;
};

export const isDueSoon = (dueDate: string | Date, days = 3) => {
  const diff = getDaysLeft(dueDate);
  return diff > 0 && diff <= days;
};