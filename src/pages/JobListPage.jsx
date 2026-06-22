import { useEffect, useState } from "react";
import { STATUS_COLORS } from "../constants/jobStatus";
import { listJobs } from "../api/jobApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function JobListPage() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function loadJobs() {
        try {
            setLoading(true)
            const data = await listJobs()
            setJobs(data)
            setError('')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadJobs()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full max-w-3xl mx-auto px-4 space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 text-center">My Jobs</h1>
                <button
                    type="button"
                    onClick={() => navigate('/jobs/new')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                    Create Job
                </button>
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Existing Jobs</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {!loading && jobs.length === 0 && <p>No jobs yet.</p>}
                    <ul className="space-y-3">
                        {jobs.map((job) => (
                            <li key={job.id}>
                                <Link
                                    to={`/jobs/${job.id}`}
                                    className="block p-4 bg-white border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-400 transition-colors"
                                >
                                {/* First line: title + status badge */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-semibold text-gray-900">{job.jobTitle}</div>
                                        <div className="text-sm text-gray-600">{job.company}</div>
                                    </div>
                                    <span className={`inline-block px-2 py-1 text-xs font-medium ${STATUS_COLORS[job.status]} rounded`}>
                                        {job.status}
                                    </span>
                                </div>

                                {/* Second line: date */}
                                <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                                    <span>Created at {new Date(job.createdAt).toLocaleString()}</span>
                                </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default JobListPage