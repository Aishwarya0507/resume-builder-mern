import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CreateResume from './pages/CreateResume'
import AnalyzeResume from './pages/AnalyzeResume'
import JobRecommendations from './pages/JobRecommendations'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TemplateGallery from './pages/TemplateGallery'
import ResumePreviewPage from './pages/ResumePreviewPage'
import { ResumeProvider } from './context/ResumeContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/create" element={<ProtectedRoute><CreateResume /></ProtectedRoute>} />
          <Route path="/dashboard/templates" element={<ProtectedRoute><TemplateGallery /></ProtectedRoute>} />
          <Route path="/dashboard/preview/:templateId" element={<ProtectedRoute><ResumePreviewPage /></ProtectedRoute>} />
          <Route path="/dashboard/analyze" element={<ProtectedRoute><AnalyzeResume /></ProtectedRoute>} />
          <Route path="/dashboard/jobs" element={<ProtectedRoute><JobRecommendations /></ProtectedRoute>} />
        </Routes>
      </ResumeProvider>
    </AuthProvider>
  )
}

