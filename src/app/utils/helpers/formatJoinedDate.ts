export const formatJoinedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return `Joined ${year}`;
};
