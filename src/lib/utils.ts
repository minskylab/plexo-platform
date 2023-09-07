import dayjs from "dayjs";

export const DateLabel = (date: Date | null, label?: string) => {
  return date ? dayjs(date).format("DD MMM") : label;
};

export const validateDate = (date: string) => {
  const taskDate = new Date(date);
  return taskDate.getTime() === 0 ? null : taskDate;
};
