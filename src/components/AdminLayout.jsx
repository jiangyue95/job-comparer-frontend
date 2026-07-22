import { NavLink, Outlet } from "react-router-dom"

const tabClass = ({ isActive }) =>
    isActive
        ? 'px-3 py-2 text-sm font-medium border-b-2 border-blue-600 text-blue-600'
        : 'px-3 py-2 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700'


function AdminLayout() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-900">Admin</h1>

                <div className="flex gap-2 border-b border-gray-200 mt-4 mb-6">
                    <NavLink to="users" className={tabClass}>Users</NavLink>
                    <NavLink to="audit-logs" className={tabClass}>Audit Logs</NavLink>
                </div>

                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout