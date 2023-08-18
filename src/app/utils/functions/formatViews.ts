export const formatViews = (views: number): string | number => {
  return views > 1000 ? `${(views / 1000).toFixed(1)}k` : views;
};
