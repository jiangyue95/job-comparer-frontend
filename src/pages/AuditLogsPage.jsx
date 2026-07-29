import { useEffect, useState } from "react";
import { getAuditLogs } from "../api/adminApi";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 20
const EMPTY_FILTERS = { action: '', email: '', from: '', to: '' }
// Mirrors AuditAction in the backend. Add new actions here when the enum changes.
const AUDIT_ACTIONS = {
    'Security events': ['LOGIN_SUCCESS', 'LOGIN_FAILURE', 'REGISTER'],
    'Business changes': [
        'CV_CREATE', 'CV_UPDATE', 'CV_DELETE',
        'JOB_CREATE', 'JOB_UPDATE', 'JOB_STATUS_UPDATE', 'JOB_DELETE',
        'ANALYSIS_CREATE', 'ANALYSIS_DELETE',
    ],
}

function actionColor(action) {
    if (action === 'REGISTER') return 'text-blue-600'
    if (action.endsWith('_FAILURE')) return 'text-red-600'
    if (action.endsWith('_DELETE')) return 'text-red-600'
    if (action.endsWith('_UPDATE')) return 'text-amber-600'
    if (action.endsWith('_CREATE') || action.endsWith('_SUCCESS')) return 'text-green-600'
    return 'text-gray-700'
}

function resourceLabel(log) {
    return log.resourceId ? `${log.action.split('_')[0]} #${log.resourceId}` : '-'
}

function AuditLogsPage() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filters, setFilters] = useState(EMPTY_FILTERS)
    const [query, setQuery] = useState(EMPTY_FILTERS)
    const [page, setPage] = useState(0)

    // Load audit log data
    useEffect(() => {
        async function loadLogs() {
            try {
                setLoading(true)
                setError('')
                const result = await getAuditLogs({ ...query, page, size: PAGE_SIZE})
                setData(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadLogs()
    }, [query, page])

    function handleChange(e) {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    function handleReset() {
        setFilters(EMPTY_FILTERS)
        setQuery(EMPTY_FILTERS)
        setPage(0)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setQuery({ ...filters })
        setPage(0)
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap gap-3 items-end"
            >
                {/* Action */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Action</label>
                    <select
                        name="action"
                        value={filters.action}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                        <option value="">All actions</option>
                        {Object.entries(AUDIT_ACTIONS).map(([group, actions]) => (
                            <optgroup key={group} label={group}>
                                {actions.map((action) => (
                                    <option key={action} value={action}>{action}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={filters.email}
                        onChange={handleChange}
                        placeholder="Exact match"
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm w-56"
                    />
                </div>

                {/* From */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">From</label>
                    <input
                        type="date"
                        name="from"
                        value={filters.from}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                </div>

                {/* To */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">To</label>
                    <input
                        type="date"
                        name="to"
                        value={filters.to}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition-colors"
                >
                    Search
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 py-2 px-3"
                >
                    Reset
                </button>
            </form>

            {/* === Results area: changes with state === */}
            {loading ? (
                <p className="text-center text-gray-500 py-12">Loading the audit logs...</p>
            ) : error ? (
                <p className="text-center text-red-600 py-12">{error}</p>
            ) : data?.content?.length === 0 ? (
                <p className="text-center text-gray-500 py-12">No audit logs found.</p>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-left text-gray-600">
                            <tr>
                                <th className="px-4 py-3 font-medium">Time</th>
                                <th className="px-4 py-3 font-medium">Action</th>
                                <th className="px-4 py-3 font-medium">Resource</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">User ID</th>
                                <th className="px-4 py-3 font-medium">IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.content.map((log) => (
                                <tr key={log.id} className="border-t border-gray-100">
                                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </td>
                                    <td className={`px-4 py-3 font-medium ${actionColor(log.action)}`}>
                                        {log.action}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {resourceLabel(log)}
                                    </td>
                                    <td className="px-4 py-3 text-gray-900">{log.email}</td>
                                    <td className="px-4 py-3 text-gray-500">{log.userId ?? '-'}</td>
                                    <td className="px-4 py-3 text-gray-500">{log.ipAddress ?? '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* pagination */}
                    <Pagination data={data} onPageChange={setPage} />
                </div>
            )}
        </>
    )
}

export default AuditLogsPage
