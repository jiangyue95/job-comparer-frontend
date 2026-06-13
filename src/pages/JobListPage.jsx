import { useEffect, useState } from "react";
import { JOB_STATUS, JOB_STATUS_OPTIONS } from "../constants/jobStatus";
import { createJob, listJobs } from "../api/jobApi";

// The initial empty state of form(Using a constant because it needs to be 
// reused during reset)
const EMPTY_FORM = {
    jobTitle: '',
    company: '',
    jobDescription: '',
    jobUrl: '',
    status: JOB_STATUS.SAVED,
    notes: '',
}

const STATUS_COLORS = {
  SAVED: 'bg-gray-100 text-gray-800',
  APPLIED: 'bg-blue-100 text-blue-800',
  INTERVIEWING: 'bg-yellow-100 text-yellow-800',
  OFFERED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  DECLINED: 'bg-orange-100 text-orange-800',
  ARCHIVED: 'bg-gray-100 text-gray-500',
}

function JobListPage() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // The whole form is managed by an object state
    const [form, setForm] = useState(EMPTY_FORM)
    const [submitting, setSubmitting] = useState(false)

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

    // A generic field update function
    function updateField(name, value) {
        setForm((prev) => ({...prev, [name]: value}))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setSubmitting(true)
        try {
            await createJob(form)
            setForm(EMPTY_FORM) // reset
            await loadJobs()
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full max-w-3xl mx-auto px-4 space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 text-center">My Jobs</h1>
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Add a new job</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    value={form.jobTitle}
                                    onChange={(e) => updateField('jobTitle', e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    value={form.company}
                                    onChange={(e) => updateField('company', e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Job URL
                                </label>
                                <input
                                    type="url"
                                    value={form.jobUrl}
                                    onChange={(e) => updateField('jobUrl', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={form.status}
                                    onChange={(e) => updateField('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {JOB_STATUS_OPTIONS.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Description
                            </label>
                            <textarea
                                value={form.jobDescription}
                                onChange={(e) => updateField('jobDescription', e.target.value)}
                                rows={5}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Notes
                            </label>
                            <textarea
                                value={form.notes}
                                onChange={(e) => updateField('notes', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            {submitting ? 'Creating...' : 'Add Job'}
                        </button>
                    </form>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Existing Jobs</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {!loading && jobs.length === 0 && <p>No jobs yet.</p>}
                    <ul className="space-y-3">
                        {jobs.map((job) => (
                            <li 
                                key={job.id}
                                className="p-4 border border-gray-200 rounded-md"
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

                                {/* Second line: date + link */}
                                <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                                    <span>Created at {new Date(job.createdAt).toLocaleString()}</span>
                                    {job.jobUrl && (
                                        <a 
                                            href={job.jobUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            View Link
                                        </a>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default JobListPage