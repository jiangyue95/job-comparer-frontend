import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCv, updateCv, deleteCv } from "../api/cvApi";

function CvDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [cv, setCv] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState('')
    const [editContent, setEditContent] = useState('')
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        async function loadCv() {
            try {
                setLoading(true)
                const data = await getCv(id)
                setCv(data)
                setError('')
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadCv()
    }, [id])

    function startEditing() {
        setEditName(cv.cvName)
        setEditContent(cv.content)
        setIsEditing(true)
    }

    function cancelEditing() {
        setIsEditing(false)
        setError('')
    }

    async function handleSave(event) {
        event.preventDefault()
        setSaving(true)
        setError('')
        try {
            const updated = await updateCv(id, editName, editContent)
            setCv(updated)
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
            `Are you sure you want to delete "${cv.cvName}"? This cannot be undone.`
        )
        if (!confirmed) return

        setDeleting(true)
        setError('')
        try {
            await deleteCv(id)
            navigate('/cvs')  // Successfully delete, back to CV list
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
                    <Link to="/cvs" className="text-blue-600 hover:text-blue-800">
                        Back to CVs
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 space-y-6">
                <Link to="/cvs" className="text-blue-600 hover:text-blue-800">
                    Back to CVs
                </Link>

                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    {isEditing ? (
                        /* ===== Edit mode ===== */
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    rows={10}
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
                    ) : (
                        /* ===== Show mode ===== */
                        <>
                            <div className="flex justify-between items-start">
                                <h1 className="text-2xl font-bold text-gray-900">{cv.cvName}</h1>
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
                            </div>
                            <div className="text-sm text-gray-500">
                                Created at {new Date(cv.createdAt).toLocaleString()}
                                {' · '}
                                Updated at {new Date(cv.updatedAt).toLocaleString()}
                            </div>
                            <div>
                                <h2 className="text-sm font-medium text-gray-700 mb-1">Content</h2>
                                <p className="whitespace-pre-wrap text-gray-800">{cv.content}</p>
                            </div>
                        </>
                    )}
                </div>

                {error && <p className="text-red-600">{error}</p>}
            </div>
        </div>
    )
}

export default CvDetailPage