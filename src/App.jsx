import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import Doctors from './pages/Doctors.jsx'
import DoctorProfile from './pages/DoctorProfile.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Support from './pages/Support.jsx'
import Terms from './pages/Terms.jsx'
import RefundPolicy from './pages/RefundPolicy.jsx'
import Sitemap from './pages/Sitemap.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:slug" element={<CourseDetail />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="doctors/:id" element={<DoctorProfile />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="support" element={<Support />} />
        <Route path="terms" element={<Terms />} />
        <Route path="refund-policy" element={<RefundPolicy />} />
        <Route path="sitemap" element={<Sitemap />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}