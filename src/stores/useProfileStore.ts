import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'profileStore';

interface ProfileState {
  name: string;
  setName: (newName: string) => void;
  clear: () => void;
  isRole: ''
}

const useProfileStore = create(
  persist<ProfileState>(
    (set) => ({
      name: '',
      isRole: '',
      setName: (newName) => set({ name: newName }),
      clear: () => set({ name: '' }),
    }),
    {
      name: STORAGE_KEY,
    }
  )
);


export default useProfileStore;