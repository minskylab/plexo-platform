import dayjs from "dayjs";

export const DateLabel = (date: Date | null, label?: string) => {
  return date ? dayjs(date).format("DD MMM") : label;
};
