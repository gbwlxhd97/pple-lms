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
import useProfileStore from '@/stores/useProfileStore';
import SignInPage from '@/pages/Auth/SignIn/SignIn';
import SignUpPage from '@/pages/Auth/SignUp/SignUp';
import MainPage from '@/pages/Main/Main';
import AttendancePage from '@/pages/Attendance/Attendance';
import NoticePage from '@/pages/Notice/Notice';
import NoticeEditPage from '@/pages/Notice/Edit/NoticeEdit';
import NoticeDetailPage from '@/pages/Notice/Detail/NoticeDetail';
import ProtectedRoute from './ProtectedRouter';
import CourseDetailPage from '@/pages/Course/Detail';
import { useEffect } from 'react';
import CourseReferencePage from '@/pages/Course/Reference';
import MyPage from '@/pages/Mypage/Mypage';
import CourseReferenceDetailPage from '@/pages/Course/Reference/Detail';
import CourseReferenceEditPage from '@/pages/Course/Reference/Edit';
import AssignmentPage from '@/pages/Assignment/Assignment';
import AssignmentDetailPage from '@/pages/Assignment/Detail/AssignmentDetail';
import StudentStaticsPage from '@/pages/StudentStatistics';
import StudentStatisticsDetailPage from '@/pages/StudentStatistics/Detail';
import SurveyTeacherPage from '@/pages/Survey/Teacher/Survey';
import SurveyStudentPage from '@/pages/Survey/Student/Survey';
import SurveyEditPage from '@/pages/Course/Survey/Edit';
import SurveyDetailPage from '@/pages/Survey/Student/SurveyDetail';
import SurveyTeacherDetailPage from '@/pages/Survey/Teacher/Detail';
import ClassRegistPage from '@/pages/ClassRegist/ClassRegist';
import GrowthPage from '@/pages/Growth';

export const RootRouter = () => {
  const {
    profile: { role },
  } = useProfileStore();

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
          path="course/:courseId"
          element={
            <ProtectedRoute>
              <CourseDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/reference/:id"
          element={
            <ProtectedRoute>
              <CourseReferencePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/reference/detail/:id"
          element={
            <ProtectedRoute>
              <CourseReferenceDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/reference/edit"
          element={
            <ProtectedRoute>
              <CourseReferenceEditPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/:courseId/notice"
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
          path="course/:courseId/notice/detail/:noticeId"
          element={
            <ProtectedRoute>
              <NoticeDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="assignment"
          element={
            <ProtectedRoute>
              <AssignmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="assignment/:id"
          element={
            <ProtectedRoute>
              <AssignmentDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/:courseId/statistics"
          element={
            <ProtectedRoute>
              <StudentStaticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/:courseId/statistics/detail/:studentId"
          element={
            <ProtectedRoute>
              <StudentStatisticsDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/:courseId/survey/:surveyId/take-survey"
          element={
            <ProtectedRoute>
              <SurveyDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/:courseId/survey"
          element={
            <ProtectedRoute>
              {role === 'TEACHER' ? (
                <SurveyTeacherPage />
              ) : (
                <SurveyStudentPage />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="course/:courseId/survey/edit"
          element={
            <ProtectedRoute>
              <SurveyEditPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/:courseId/survey/:surveyId"
          element={
            <ProtectedRoute>
              <SurveyTeacherDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/:courseId/class-regist"
          element={
            <ProtectedRoute>
              <ClassRegistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="course/:courseId/growth/:courseSectionId"
          element={
            <ProtectedRoute>
              <GrowthPage />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
