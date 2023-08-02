export const isVideoType = (url: string): boolean => {
  return /\.(mp4)/.test(url);
};

export const isImageType = (url: string): boolean => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)/.test(url);
};
