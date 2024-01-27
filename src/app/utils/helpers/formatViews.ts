export const formatViews = (views: number): string | number => {
  if (views > 1000) {
    const formatted = (views / 1000).toFixed(1);
    return formatted.endsWith('.0') ? `${formatted.slice(0, -2)}k` : `${formatted}k`;
  }
  return views;
};
