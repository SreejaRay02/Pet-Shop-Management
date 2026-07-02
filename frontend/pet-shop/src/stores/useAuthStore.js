// Zustand library to create the global state
import { create } from 'zustand';

// Middleware to save state in localStorage (persist) and see it in Redux DevTools (devtools)
import { persist, devtools } from 'zustand/middleware';

// Import our central API instance
import axiosInstance from '../api/axiosInstance';

// jwt-decode helps us read the contents of the JWT token
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = create(
  devtools(
    persist(
      // The 'set' function updates the state, 'get' reads the current state
      (set, get) => ({
        
        // --- STATE ---
        user: null,             // Stores the logged-in user's details
        token: null,            // Stores the JWT string
        role: null,             // Stores the user's role (e.g., 'Admin', 'Customer')
        isAuthenticated: false, // True if the user is logged in
        
        // --- ACTIONS ---

        // Login Action
        login: async (email, password) => {
          // Send login request to JSON Server Auth
          const response = await axiosInstance.post('/login', { email, password });
          const { accessToken, user } = response.data;
          
          let role = user?.role || 'Customer'; // Default to Customer if role is missing
          
          // Decode the token to see if it contains the role
          try {
            const decoded = jwtDecode(accessToken);
            role = decoded.role || role;
          } catch (_error) {
            console.error("Token decoding failed", error);
          }
          
          // Update the global state
          set({ token: accessToken, user, role, isAuthenticated: true });
          return { user, role };
        },

        // Register Action
        register: async (userData) => {
          // Send registration request
          const response = await axiosInstance.post('/register', userData);
          const { accessToken, user } = response.data;
          
          // Update state and log the user in immediately
          set({ token: accessToken, user, role: user.role || 'Customer', isAuthenticated: true });
          return { user };
        },

        // Logout Action
        logout: () => {
          // Clear all authentication data from the state
          set({ user: null, token: null, role: null, isAuthenticated: false });
        },

        // Update User Action
        updateUser: (updates) => {
          // Merge new data into the existing user object
          set((state) => ({ user: { ...state.user, ...updates } }));
        },

        // Restore Session Action
        // Runs when the app starts to check if the saved token is still valid
        restoreSession: () => {
          const { token, user } = get();
          
          if (token && user) {
            try {
              const decoded = jwtDecode(token);
              // Check if the token has expired (exp is in seconds, Date.now() is in milliseconds)
              if (decoded.exp * 1000 < Date.now()) {
                get().logout(); // Token expired, log them out
                return false;
              }
              
              // Token is valid, ensure they are marked as authenticated
              set({ isAuthenticated: true });
              return true;
            } catch (error) {
              get().logout(); // Token is invalid, log them out
              return false;
            }
          }
          return false;
        },
      }),
      {
        // name: The key used to save the data in the browser's localStorage
        name: 'petshop-auth',
        
        // partialize: Choose exactly which pieces of state to save to localStorage
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          role: state.role,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' } // Name for Redux DevTools
  )
);

