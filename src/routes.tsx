import DashboardSectionLoader from '@/components/loaders/DashboardSectionLoader';
import FullScreenLoader from '@/components/loaders/FullScreenLoader';
// import ConfirmPopUpEvent from '@/pages/(guarded-page)/PopUp/PopUpEvent';
import { Route, Routes } from '@solidjs/router';
import { lazy, Suspense } from 'solid-js';

const GuestLayout = lazy(() => import('@/layouts/GuestLayout'));
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'));
const HomePage = lazy(() => import('@/pages/(landing-page)/HomePage'));
const AboutPage = lazy(() => import('@/pages/(landing-page)/AboutPage'));
const ProgramsPage = lazy(() => import('@/pages/(landing-page)/ProgramsPage'));
const ScholarshipsDetailPage = lazy(
  () => import('@/pages/(guarded-page)/ScholarshipsDetailPage'),
);
const TestimonialPage = lazy(
  () => import('@/pages/(landing-page)/TestimonialPage'),
);
const SigninPage = lazy(
  () => import('@/pages/(landing-page)/(auth)/SigninPage'),
);
const SignupPage = lazy(
  () => import('@/pages/(landing-page)/(auth)/SignupPage'),
);
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));
const BookmarkPage = lazy(() => import('@/pages/(guarded-page)/BookmarkPage'));
const DashboardPage = lazy(
  () => import('@/pages/(guarded-page)/DashboardPage'),
);
const EventsPage = lazy(
  () => import('@/pages/(guarded-page)/events/EventsPage'),
);
const EventsCategory = lazy(
  () => import('@/pages/(guarded-page)/events/EventsCategory'),
);
const EventDetail = lazy(
  () => import('@/pages/(guarded-page)/events/EventDetail'),
);
const JobsPage = lazy(() => import('@/pages/(guarded-page)/JobsPage'));
const ProfilePage = lazy(() => import('@/pages/(guarded-page)/ProfilePage'));
const EditProfilePage = lazy(
  () => import('@/pages/(guarded-page)/EditProfilePage'),
);
const ScholarshipsPage = lazy(
  () => import('@/pages/(guarded-page)/ScholarshipsPage'),
);

const HistoryPage = lazy(
  () => import('@/pages/(guarded-page)/HistoryPage'),
);

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export default function GetRoutes() {
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <GuestLayout>
            <HomePage />
          </GuestLayout>
        }
      />
      <Route
        path={'/about'}
        element={
          <GuestLayout>
            <AboutPage />
          </GuestLayout>
        }
      />
      <Route
        path={'/programs'}
        element={
          <GuestLayout>
            <ProgramsPage />
          </GuestLayout>
        }
      />
      <Route
        path={'/testimonial'}
        element={
          <GuestLayout>
            <TestimonialPage />
          </GuestLayout>
        }
      />

      <Route
        path={'/signin'}
        element={
          <AuthLayout>
            <SigninPage />
          </AuthLayout>
        }
      />
      <Route
        path={'/signup'}
        element={
          <AuthLayout>
            <SignupPage />
          </AuthLayout>
        }
      />

      <Route
        path={'/dashboard'}
        element={
          <DashboardLayout name='Dashboard'>
            <Suspense fallback={<DashboardSectionLoader />}>
              <DashboardPage />
            </Suspense>
          </DashboardLayout>
        }
      />

      <Route
        path={'/history'}
        element={
          <DashboardLayout name='Riwayat Kegiatan'>
            <Suspense fallback={<DashboardSectionLoader />}>
              <HistoryPage />
            </Suspense>
          </DashboardLayout>
        }
      />

      <Route path={'/events'}>
        <Route
          path={'/'}
          element={
            <DashboardLayout name='Events'>
              <Suspense fallback={<DashboardSectionLoader />}>
                <EventsPage />
              </Suspense>
            </DashboardLayout>
          }
        />
        <Route path={'/category'}>
          <Route path={'/webinar'}>
            <Route
              path={'/'}
              element={
                <DashboardLayout name='Webinar'>
                  <Suspense fallback={<DashboardSectionLoader />}>
                    <EventsCategory category={'Webinar'} />
                  </Suspense>
                </DashboardLayout>
              }
            />
            <Route
              path={'/:id'}
              element={
                <DashboardLayout name='Webinar'>
                  <Suspense fallback={<DashboardSectionLoader />}>
                    <EventDetail />
                  </Suspense>
                </DashboardLayout>
              }
            />
          </Route>
          <Route path={'/lomba'}>
            <Route
              path={'/'}
              element={
                <DashboardLayout name='Lomba'>
                  <Suspense fallback={<DashboardSectionLoader />}>
                    <EventsCategory category={'Lomba'} />
                  </Suspense>
                </DashboardLayout>
              }
            />
            <Route
              path={'/:id'}
              element={
                <DashboardLayout name='Lomba'>
                  <Suspense fallback={<DashboardSectionLoader />}>
                    <EventDetail />
                  </Suspense>
                </DashboardLayout>
              }
            />
          </Route>
          <Route path={'/volunteer'}>
            <Route
              path={'/'}
              element={
                <DashboardLayout name='Volunteer'>
                  <Suspense fallback={<DashboardSectionLoader />}>
                    <EventsCategory category={'Volunteer'} />
                  </Suspense>
                </DashboardLayout>
              }
            />
            <Route
              path={'/:id'}
              element={
                <DashboardLayout name='Volunteer'>
                  <Suspense fallback={<DashboardSectionLoader />}>
                    <EventDetail />
                  </Suspense>
                </DashboardLayout>
              }
            />
          </Route>
        </Route>
      </Route>
      <Route
        path={'/scholarships'}
        element={
          <DashboardLayout name='Beasiswa'>
            <Suspense fallback={<DashboardSectionLoader />}>
              <ScholarshipsPage />
            </Suspense>
          </DashboardLayout>
        }
      />
      <Route
        path={'/scholarships-detail/:id'}
        element={
          <DashboardLayout name='Beasiswa'>
            <Suspense fallback={<DashboardSectionLoader />}>
              <ScholarshipsDetailPage />
            </Suspense>
          </DashboardLayout>
        }
      />
      <Route
        path={'/jobs'}
        element={
          <DashboardLayout name='Lowongan Kerja'>
            <Suspense fallback={<DashboardSectionLoader />}>
              <JobsPage />
            </Suspense>
          </DashboardLayout>
        }
      />
      <Route
        path={'/bookmark'}
        element={
          <DashboardLayout name='Bookmark'>
            <Suspense fallback={<DashboardSectionLoader />}>
              <BookmarkPage />
            </Suspense>
          </DashboardLayout>
        }
      />
      <Route
        path={'/profile'}
        element={
          <DashboardLayout name='Profile'>
            <Suspense fallback={<DashboardSectionLoader />}>
              <ProfilePage />
            </Suspense>
          </DashboardLayout>
        }
      />

      <Route
        path={'/profile/edit'}
        element={
          <DashboardLayout name='Edit Profil'>
            <Suspense fallback={<DashboardSectionLoader />}>
              <EditProfilePage />
            </Suspense>
          </DashboardLayout>
        }
      />

      {/* <Route
        path={'/popupevent'}
        element={
          <DashboardLayout name='PopUp Event'>
            <Suspense fallback={<DashboardSectionLoader />}>
              <ConfirmPopUpEvent/>
            </Suspense>
          </DashboardLayout>
        }
      /> */}

      <Route
        path={'*'}
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
