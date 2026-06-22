import { useNavigate } from "react-router-dom"
import { JOB_STATUS, JOB_STATUS_OPTIONS } from "../constants/jobStatus"
import { useState } from "react"
import { createJob } from "../api/jobApi"

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
function JobCreatePage() {
    // The whole form is managed by an object state
    const [form, setForm] = useState(EMPTY_FORM)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    // A generic field update function
    function updateField(name, value) {
        setForm((prev) => ({...prev, [name]: value}))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setSubmitting(true)
        try {
            await createJob(form)
            navigate('/jobs')
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full max-w-3xl mx-auto px-4 space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 text-center">Add a new job</h1>
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
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
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                            >
                                {submitting ? 'Creating...' : 'Add Job'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/jobs')}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JobCreatePage