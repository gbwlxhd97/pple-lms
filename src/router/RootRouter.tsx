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
import NoticePage from '@/pages/Notice/Notice';
import NoticeEditPage from '@/pages/NoticeEdit/NoticeEdit';
import NoticeDetailPage from '@/pages/NoticeDetail/NoticeDetail';
import ProtectedRoute from './ProtectedRouter';
import CourseDetailPage from '@/pages/Course/Detail';
import { useEffect } from 'react';

export const RootRouter = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 초기 실행
    setViewportHeight();

    // 창 크기 변경 시 다시 계산
    window.addEventListener('resize', setViewportHeight);

    // Cleanup 함수로 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);

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
        <Route
          path="notice"
          element={
            <ProtectedRoute>
              <NoticePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="notice/edit"
          element={
            <ProtectedRoute>
              <NoticeEditPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="notice/detail/:id"
          element={
            <ProtectedRoute>
              <NoticeDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
