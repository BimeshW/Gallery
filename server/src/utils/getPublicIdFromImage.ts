export const getPublicIdFromUrl = (url: string) => {
  if (!url) return null;
  const parts = url.split("/");
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex === -1) return null;

  // After 'upload', next part might be version (v...), then public_id
  const publicIdWithExtension = parts.slice(uploadIndex + 2).join("/"); // Handles folders too
  const publicId = publicIdWithExtension.split(".")[0]; // Remove extension
  return publicId;
};
