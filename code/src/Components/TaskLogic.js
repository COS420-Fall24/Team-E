export const TASK_TYPES = [
  "Healthy Eating",
  "Rest",
  "Knowledge",
  "Social",
  "Tidyness",
  "Mental",
];

export const REPEAT_TYPES = ["Daily", "Weekly", "Bi-Weekly", "Monthly"];

export const generateTimeOptions = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  return { hours, minutes };
};

export const getDaySuffix = (day) => {
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

export const editTask = (title, task, type, dueDate, isRepeat, points) => {
  return {
    title,
    task,
    type,
    dueDate,
    isRepeat,
    points,
  };
};

export function taskToString(task) {
    return (
        task.title + "\n" + task.task + "\n" + task.type + "\n" + task.dueDate.toString() + "\n" + task.isRepeat.toString() + "\n" + task.points.toString() + "\n"
    )
}