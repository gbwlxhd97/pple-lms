import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'profileStore';

interface Profile {
  name: string;
  role: 'TEACHER' | 'STUDENT' | '';
}

interface ProfileState {
  profile: Profile;
  setProfile: (newProfile: Profile) => void;
  clear: () => void;
}

const useProfileStore = create(
  persist<ProfileState>(
    (set) => ({
      profile: { name: '', role: '' },
      setProfile: (newProfile) => set({ profile: newProfile }),
      clear: () => set({ profile: { name: '', role: '' } }),
    }),
    {
      name: STORAGE_KEY,
    }
  )
);

export default useProfileStore;
