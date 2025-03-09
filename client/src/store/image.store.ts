import { create } from "zustand";
import { fetchImageTypes, IImage } from "../types/types";
import { showToast } from "../utils/toast";

interface ImageStore {
  images: IImage[] | [];
  loading: boolean;
  fetchImages: () => Promise<void>;
  uploadImage: () => Promise<void>;
  deleteImage: () => Promise<void>;
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
  deleteImage: () => {},
}));
