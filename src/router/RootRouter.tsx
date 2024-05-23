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
} from 'react-router-dom';
import SignInPage from '@/pages/Auth/SignIn/SignIn';
import SignUpPage from '@/pages/Auth/SignUp/SignUp';
import MainPage from '@/pages/Main/Main';
import AttendancePage from '@/pages/Attendance/Attendance';
import NoticePage from '@/pages/Notice/Notice';

export const RootRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="login" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="chat-list" element={<CharRooms />} />
        <Route path="reservation" element={<ReservationIndexPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="notice" element={<NoticePage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
