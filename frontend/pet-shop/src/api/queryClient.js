// Import QueryClient class to create our configuration
import { QueryClient } from '@tanstack/react-query';


export const queryClient = new QueryClient({
  defaultOptions: {
    
    queries: {
     
      staleTime: 1000 * 60 * 5,
      
      
      gcTime: 1000 * 60 * 10,
      
      
      retry: 2,
      
      refetchOnWindowFocus: false,
    },
    
    
    mutations: {
      
      onError: (error) => {
       
        const message = error?.response?.data?.message || error.message || 'Something went wrong';
        
        // Show the error message in the console
        console.error(message);
      },
    },
  },
});
