import RootLayout from '@/components/Layout/RootLayout/RootLayout';
import DetailReservation from '@/pages/Reservation/Detail/DetailReservation';
import ReservationIndexPage from '@/pages/Reservation/Index/Index';
import ChatRoom from '@/pages/Chat/ChatRoom/ChatRoom';
import CharRooms from '@/pages/Chat/ChatRooms/ChatRooms';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import SignInPage from '@/pages/Auth/SignIn/SignIn';
import SignUpPage from '@/pages/Auth/SignUp/SignUp';
import MainPage from '@/pages/Main/Main';
import AttendancePage from '@/pages/Attendance/Attendance';
import ProtectedRoute from './ProtectedRouter';
import CourseDetailPage from '@/pages/Course/Detail';

export const RootRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/main" replace />} />
        <Route path="login" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route
          path="attendance"
          element={
            <ProtectedRoute>
              <AttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/*"
          element={
            <ProtectedRoute>
              <CourseDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
