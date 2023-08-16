import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './app/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { Router } from './router';
import { SideBarProvider } from './app/contexts/SidebarContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SideBarProvider>
          <Router />
          <Toaster />
        </SideBarProvider>
      </AuthProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};
