export const addThreeDots = (string: string, limit: number) => {
  const dots = '...';
  if (string.length > limit) {
    string = string.substring(0, limit) + dots;
  }

  return string;
};
