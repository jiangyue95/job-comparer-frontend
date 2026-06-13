import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
function DashboardPage() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                <ul className="space-y-4">
                    <li>
                        <Link 
                            to="/cvs"
                            className="block p-4 bg-white border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-400 transition-colors"
                        >
                            Manage my CVs
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/cvs"
                            className="block p-4 bg-white border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-400 transition-colors"
                        >
                            Manage my Jobs
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/cvs"
                            className="block p-4 bg-white border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-400 transition-colors"
                        >
                            Analyze CV vs Job
                        </Link>
                    </li>
                </ul>
                <button 
                    onClick={handleLogout}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default DashboardPage