import { create } from "zustand";
import { fetchImageTypes, IImage, ResponseType } from "../types/types";
import { showToast } from "../utils/toast";

interface ImageStore {
  images: IImage[] | [];
  loading: boolean;
  fetchImages: () => Promise<void>;
  uploadImage: () => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
}

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  loading: false,

  fetchImages: async () => {
    try {
      set({ loading: true });
      const res = await fetch("/api/image/get");
      const data: fetchImageTypes = await res.json();

      if (data.success === true) {
        set({ images: data.image, loading: false });
        showToast({ message: data.message, type: "success" });
      } else {
        set({ images: [], loading: false });
        showToast({ message: data.message, type: "error" });
      }
    } catch (error) {
      set({ images: [], loading: false });
      console.log(error);
    }
  },
  uploadImage: () => {},

  deleteImage: async (id) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/image/${id}`, {
        method: "DELETE",
      });

      const data: ResponseType = await res.json();

      if (data.success === true) {
        set({ loading: false });
        showToast({ message: data.message, type: "success" });
      } else {
        set({ loading: false });
        showToast({ message: data.message, type: "error" });
      }
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
}));
