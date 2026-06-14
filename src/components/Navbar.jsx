import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    // Not login: do not show nav bar
    if (!isAuthenticated) {
        return null
    }

    // The className of a NavLink could be a function, receive { isActive }
    const linkClass = ({ isActive }) =>
        isActive
            ? 'px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white'
            : 'px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100'
        
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
                {/* Lift side: brand + navigate link */}
                <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 mr-4">Job Comparer</span>
                    <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                    <NavLink to="/cvs" className={linkClass}>CVs</NavLink>
                    <NavLink to="/jobs" className={linkClass}>Jobs</NavLink>
                    <NavLink to="/analyze" className={linkClass}>Analyze</NavLink>
                </div>

                {/* Right side: logout */}
                <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar