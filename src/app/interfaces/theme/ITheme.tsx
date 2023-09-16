export interface ITheme {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  singleTheme: (theme: 'light' | 'dark') => void;
}
