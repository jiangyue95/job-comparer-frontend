import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";


function AdminRoute({ children }) {
    const { isAuthenticated, loadingUser, user } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (loadingUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading ...</p>
            </div>
        )
    }

    if (user?.role !== 'ADMIN') {
        return <Navigate to="/dashboard" replace />
    }

    return children
}

export default AdminRoute