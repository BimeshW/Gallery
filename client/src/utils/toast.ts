import toast from "react-hot-toast";
import { ToastTypes } from "../types/types";



export const showToast = ({message, type} : ToastTypes) => {
  if(type == "error") {
    return toast.error(message);
  }

  if(type == "success") {
    return toast.success(message);
  }
}

