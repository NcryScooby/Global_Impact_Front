export function debounce<F extends (...args: never[]) => unknown>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timerId: NodeJS.Timeout | null = null;
  return (...args: Parameters<F>) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
