import toast from "react-hot-toast";
import { ToastTypes } from "../types/types";

export const showToast = ({ message, type }: ToastTypes) => {
  if (type == "error") {
    return toast.error(message, {
      style: {
        fontSize: "11px",
      },
    });
  }

  if (type == "success") {
    return toast.success(message, {
      style: {
        fontSize: "11px",
      },
    });
  }
};
