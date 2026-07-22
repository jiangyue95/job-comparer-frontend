import { useState, useEffect } from "react"
import { getUsers } from "../api/adminApi"
import Pagination from "../components/Pagination"

const PAGE_SIZE = 20
const roleBadge = {
    ADMIN: 'bg-purple-100 text-purple-700',
    USER: 'bg-gray-100 text-gray-600',
}

function UserListPage() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [page, setPage] = useState(0)

    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true)
                setError('')
                const result = await getUsers({ page, size: PAGE_SIZE })
                setData(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadUsers()
    }, [page])

    return (
        <>
            {loading ? (
                <p className="text-center text-gray-500 py-12">Loading the users...</p>
            ) : error ? (
                <p className="text-center text-red-600 py-12">{error}</p>
            ) : data?.content?.length === 0 ? (
                <p className="text-center text-gray-500 py-12">No users found.</p>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-4 py-3 font-medium">ID</th>
                                <th className="px-4 py-3 font-medium">Username</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Role</th>
                                <th className="px-4 py-3 font-medium">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((user) => (
                                <tr key={user.id} className="border-t border-gray-100">
                                    <td className="px-4 py-3 text-gray-500">{user.id}</td>
                                    <td className="px-4 py-3 text-gray-900 font-medium">{user.username}</td>
                                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadge[user.role]}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                        {new Date(user.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination data={data} onPageChange={setPage} />
                </div>
            )}
        </>
    )
}
export default UserListPage