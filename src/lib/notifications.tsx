import { showNotification } from "@mantine/notifications";
import { AlertCircle, Check, X } from "tabler-icons-react";

export const SuccessNotification = (title: string, message: string) => {
  return showNotification({
    autoClose: 5000,
    title: title,
    message: message,
    color: "blue",
    icon: <Check size={18} />,
  });
};

export const ErrorNotification = (message?: string) => {
  return showNotification({
    autoClose: 5000,
    title: "Error!",
    message: message ? message : "Try again",
    color: "red",
    icon: <X size={18} />,
  });
};

export const AlertNotification = (id: string, title: string, message: string) => {
  return showNotification({
    id: id,
    autoClose: 5000,
    title: title,
    message: message,
    color: "yellow",
    icon: <AlertCircle size={18} />,
  });
};
