import { useEffect, useState } from "react";
import { listCvs } from "../api/cvApi";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import CvCreateForm from "../components/CvCreateForm";

function CvListPage() {
    // List data
    const [cvs, setCvs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Create CV modal state
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Load list (encapsulate as a function, because it will be used in loading 
    // and refresh after create)
    async function loadCvs() {
        try {
            setLoading(true)
            const data = await listCvs()
            setCvs(data)
            setError('')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // The component is loaded only once during its first rendering.
    useEffect(() => {
        loadCvs()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full max-w-3xl mx-auto px-4 space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 text-center">
                    My CVs
                </h1>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                    Create CV
                </button>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Create new CV"
                >
                    <CvCreateForm
                        onSuccess={() => {
                            loadCvs()
                            setIsModalOpen(false)
                        }}
                    />
                </Modal>

                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    {/* List display */}
                    <h2 className="text-xl font-semibold">Existing CVs</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-600">{error}</p>}
                    {!loading && cvs.length === 0 && <p>No CVs yet.</p>}

                    <ul className="space-y-3">
                        {cvs.map((cv) => (
                            <li key={cv.id}>
                                <Link
                                    to={`/cvs/${cv.id}`}
                                    className="block p-4 bg-white border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-400 transition-colors"
                                >
                                    <div className="font-semibold text-gray-900">{cv.cvName}</div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Created at {new Date(cv.createdAt).toLocaleString()}
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

export default CvListPage