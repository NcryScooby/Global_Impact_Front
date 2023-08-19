export function formatDate(inputDate: string): string {
  const dateObj = new Date(inputDate);

  const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  const formattedDate = dateObj.toLocaleDateString('en-US', optionsDate);
  const formattedTime = dateObj.toLocaleTimeString('en-US', optionsTime);

  return `${formattedDate} • ${formattedTime}`;
}
