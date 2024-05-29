import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'courseInfoStore';

interface Info {
  title: string;
  courseId: number;
}

// Define the state and actions interface
interface CourseNameState {
  info: Info;
  setInfo: (newProfile: Info) => void;
}

const useCourseInfo = create(
  persist<CourseNameState>(
    (set) => ({
      info: { title: '', courseId: 0 },
      setInfo: (newInfo) => set({ info: newInfo }),
    }),
    {
      name: STORAGE_KEY,
    }
  )
);

export default useCourseInfo;
