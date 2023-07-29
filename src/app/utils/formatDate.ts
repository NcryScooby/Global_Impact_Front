export function formatDate(inputDate: string): string {
  const dateObj = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return dateObj.toLocaleDateString("en-US", options);
}
