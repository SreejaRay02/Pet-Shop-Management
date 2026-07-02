import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export const useUIStore = create(
    devtools(
        persist(

            (set) => ({


                sidebarOpen: true,
                themeMode: 'light',
                globalLoading: false,
                modalState: { open: false, type: null, data: null },
                breadcrumbs: [],


                toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),


                setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),

                toggleTheme: () =>
                    set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),




                setGlobalLoading: (isLoading) => set({ globalLoading: isLoading }),


                openModal: (type, data = null) =>
                    set({ modalState: { open: true, type, data } }),




                closeModal: () =>
                    set({ modalState: { open: false, type: null, data: null } }),


                setBreadcrumbs: (crumbs) => set({ breadcrumbs: crumbs }),
            }),
            {

                name: 'petshop-ui',


                partialize: (state) => ({ themeMode: state.themeMode, sidebarOpen: state.sidebarOpen }),
            }
        ),
        { name: 'UIStore' }
    )
);

