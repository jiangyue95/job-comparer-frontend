import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useAnalysisSummary } from "../context/AnalysisContext"

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth()
    const { summary } = useAnalysisSummary()
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
                    <div className="relative">
                        <NavLink to="/history" className={linkClass}>History</NavLink>
                        {summary.unread > 0 && (
                            <span
                                className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1
                                           flex items-center justify-center
                                           rounded-full bg-red-500 text-white text-[10px] font-medium"
                                aria-label={`${summary.unread} unread ${summary.unread === 1 ? 'analysis' : 'analyses'}`}
                            >
                                {summary.unread > 9 ? '9+' : summary.unread}
                            </span>
                        )}
                    </div>
                    {user?.role === 'ADMIN' && (
                        <NavLink to="/admin" className={linkClass}>Admin</NavLink>
                    )}
                </div>

                {/* Right side: username + logout */}
                <div className="flex items-center gap-4">
                    {user && (
                        <NavLink to="/profile" className="flex items-center gap-2 hover:opacity-80">
                            {user.avatarUrl ? (
                                <img src={user.avatarUrl} alt="avatar"
                                     className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                    {user.username?.[0]?.toUpperCase()}
                                </div>
                            )}
                            <span className="text-sm text-gray-700">
                                Hi, {user.username}
                            </span>
                        </NavLink>
                    )}
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar