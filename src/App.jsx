import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import CvListPage from "./pages/CvListPage"
import CvDetailPage from "./pages/CvDetailPage"
import ProtectedRoute from "./components/ProtectedRoute"
import JobListPage from "./pages/JobListPage"
import JobDetailPage from "./pages/JobDetailPage"
import AnalysisPage from "./pages/AnalysisPage"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"
import { useAuth } from "./context/AuthContext"
import LandingPage from "./pages/LandingPage"

function Home() {
  const { token } = useAuth()
  return token ? <Navigate to="/dashboard" replace /> : <LandingPage />
}
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cvs" 
          element={
            <ProtectedRoute>
              <CvListPage />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/cvs/:id"
          element={
            <ProtectedRoute>
              <CvDetailPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/jobs" 
          element={
            <ProtectedRoute>
              <JobListPage />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analyze"
          element={
            <ProtectedRoute>
              <AnalysisPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Page not found</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App