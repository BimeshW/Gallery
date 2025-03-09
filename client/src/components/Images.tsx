import { IImage } from "../types/types";
import { formatMongoDate } from "../utils/convertDate";
import { motion } from "framer-motion";

interface Props {
  images: IImage[];
}

// Helper function to group images by date
const groupByDate = (images: IImage[]) => {
  return images.reduce((acc, img) => {
    const dateKey = formatMongoDate(img.uploadedAt); // Format date like "Oct 27 2025"
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(img);
    return acc;
  }, {} as Record<string, IImage[]>);
};

const Images = ({ images }: Props) => {
  const groupedImages = groupByDate(images);

  return (
    <div className="p-4">
      {images.length === 0 && <h2>No Image Found, Upload</h2>}

      {Object.entries(groupedImages).map(([date, imgs]) => (
        <div key={date} className="space-y-4">
          {/* Display Date */}
          <p className="text-xs font-semibold m-4">{date}</p>

          {/* Display Images in a Row */}
          <div className="flex flex-wrap gap-2">
            {imgs.map((img) => (
              <motion.img
                key={img._id}
                src={img.cloudinaryUrl}
                className="hover:opacity-80 cursor-pointer rounded-lg h-52 w-auto"
                whileHover={{ scale: 1.1 }}
                alt="optimised"
                
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Images;
