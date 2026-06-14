import { useEffect, useState } from "react";
import { JOB_STATUS, JOB_STATUS_OPTIONS, STATUS_COLORS } from "../constants/jobStatus";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getJob, updateJob, deleteJob } from "../api/jobApi";

function JobDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [isEditing, setIsEditing] = useState(false)
    const [editForm, setEditForm] = useState(null)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        async function loadJob() {
            try {
                setLoading(true)
                const data = await getJob(id)
                setJob(data)
                setError('')
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadJob()
    }, [id])

    function startEditing() {
        setEditForm({
            jobTitle: job.jobTitle,
            company: job.company,
            jobDescription: job.jobDescription,
            jobUrl: job.jobUrl,
            status: job.status,
            notes: job.notes,
        })
        setIsEditing(true)
    }

    function cancelEditing() {
        setIsEditing(false)
        setError('')
    }

    function updateField(name, value) {
        setEditForm((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSave(event) {
        event.preventDefault()
        setSaving(true);
        setError('')
        try {
            const updated = await updateJob(id, editForm)
            setJob(updated)
            setIsEditing(false)
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete() {
        // Delete confirmation
        const confirmed = window.confirm(
            `Are you sure you want to delete "${job.jobTitle}"? This cannot be undone.`
        )
        if (!confirmed) return

        setDeleting(true)
        setError('')
        try {
            await deleteJob(id)
            navigate('/jobs')  // Successfully delete, back to Job list
        } catch (err) {
            setError(err.message)
            setDeleting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-2xl mx-auto px-4">
                    <p className="text-red-600">{error}</p>
                    <Link to="/jobs" className="text-blue-600 hover:text-blue-800">
                        Back to Jobs
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 space-y-6">
                <Link to="/jobs" className="text-blue-600 hover:text-blue-800">
                    Back to Jobs
                </Link>
                {isEditing ? (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {/* ===== Edit mode ===== */}
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.jobTitle}
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
                                        value={editForm.company}
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
                                        value={editForm.jobUrl}
                                        onChange={(e) => updateField('jobUrl', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={editForm.status}
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
                                    value={editForm.jobDescription}
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
                                    value={editForm.notes}
                                    onChange={(e) => updateField('notes', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                                >
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelEditing}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <>
                        <div className="flex gap-2">
                            <button
                                onClick={startEditing}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                            {/* Title line: title/company on the left, status badge on the right */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{job.jobTitle}</h1>
                                    <div className="text-gray-600">{job.company}</div>
                                </div>
                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${STATUS_COLORS[job.status]}`}>
                                    {job.status}
                                </span>
                            </div>

                            {/* timestamp */}
                            <div className="text-sm text-gray-500">
                                Created at {new Date(job.createdAt).toLocaleString()}
                                {' · '}
                                Updated at {new Date(job.updatedAt).toLocaleString()}
                            </div>

                            {/* jobUrl - could be null */}
                            {job.jobUrl && (
                                <div>
                                    <h2 className="text-sm font-medium text-gray-700 mb-1">Job URL</h2>
                                    <a
                                        href={job.jobUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 break-all"
                                    >
                                        {job.jobUrl}
                                    </a>
                                </div>
                            )}

                            {/* Description */}
                            <div>
                                <h2 className="text-sm font-medium text-gray-700 mb-1">Description</h2>
                                <p className="whitespace-pre-wrap text-gray-800">{job.jobDescription}</p>
                            </div>

                            {/* Notes */}
                            <div>
                                <h2 className="text-sm font-medium text-gray-700 mb-1">Notes</h2>
                                <p className="whitespace-pre-wrap text-gray-800">{job.notes}</p>
                            </div>
                        </div>
                    </>
                )}
                {error && <p className="text-red-600">{error}</p>}
            </div>
        </div>
    )
}

export default JobDetailPage