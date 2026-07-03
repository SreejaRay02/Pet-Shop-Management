import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/queryClient';
import { useUIStore } from './stores/uiStore';
import AppRouter from './routes/AppRouter';

export default function App() {
  // getting the mode of the theme 
  const themeMode = useUIStore((state) => state.themeMode);

  
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', themeMode);
  }, [themeMode]);

  // here Returning the Providers wrapping the AppRouter
  return (
    <QueryClientProvider client={queryClient}>
        
        {/* Our main routing system that decides which page to show */}
        <AppRouter />
        
        {/* Global setup for our Toast popups */}
        
    </QueryClientProvider>
  );
}
