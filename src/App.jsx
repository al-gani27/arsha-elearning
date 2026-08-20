import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Courses from "./pages/Courses"
import CourseDetail from "./pages/CourseDetail"
import AdminCourses from "./pages/AdminCourses"
import AdminDashboard from "./pages/role/AdminDashboard"
import GuruDashboard from "./pages/role/GuruDashboard"
import SiswaDashboard from "./pages/role/SiswaDashboard"
import Unauthorized from "./pages/Unauthorized"
import Footer from "./components/Footer"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Courses />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={['admin']}><AdminCourses /></ProtectedRoute>} />

              <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/guru" element={<ProtectedRoute allowedRoles={['guru']}><GuruDashboard /></ProtectedRoute>} />
              <Route path="/siswa" element={<ProtectedRoute allowedRoles={['siswa','guru','admin']}><SiswaDashboard /></ProtectedRoute>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App
