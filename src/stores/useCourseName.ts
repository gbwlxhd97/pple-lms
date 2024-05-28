import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'courseNameStore';

// Define the state and actions interface
interface CourseNameState {
  title: string;
  setTitle: (newTitle: string) => void;
}

const useCourseNameStore = create(
  persist<CourseNameState>(
    (set) => ({
      title: '',
      setTitle: (newTitle: string) => set({ title: newTitle }),
    }),
    {
      name: STORAGE_KEY,
    }
  )
);

export default useCourseNameStore;
