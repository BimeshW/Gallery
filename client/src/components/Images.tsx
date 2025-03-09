import { IImage } from "../types/types";

interface Props {
  images: IImage[];
}

const Images = ({ images }: Props) => {
  return (
    <div>
      {images.length === 0 && (
        <h2>{images.length === 0 && <div>No Image Found, Upload</div>}</h2>
      )}
      {images.map((i) => (
        <img src={i.cloudinaryUrl} />
      ))}
    </div>
  );
};

export default Images;
