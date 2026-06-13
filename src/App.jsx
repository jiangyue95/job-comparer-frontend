import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import CvListPage from "./pages/CvListPage"
import ProtectedRoute from "./components/ProtectedRoute"
import JobListPage from "./pages/JobListPage"
import AnalysisPage from "./pages/AnalysisPage"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        {' | '}
        <Link to="/cvs">CVs</Link>
        {' | '}
        <Link to="/jobs">Jobs</Link>
        {' | '}
        <Link to="/analyze">Analyze</Link>
        {' | '}
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
          path="/jobs" 
          element={
            <ProtectedRoute>
              <JobListPage />
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
      </Routes>
    </BrowserRouter>
  )
}

export default App