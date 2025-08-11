export const url = "http://10.10.20.40:5090";
export const imageUrl = (image) => {
  return image
    ? image?.startsWith("http")
      ? image
      : image?.startsWith("/")
      ? `${url}${image}`
      : `${url}/${image}`
    : "https://placehold.co/400";
};
