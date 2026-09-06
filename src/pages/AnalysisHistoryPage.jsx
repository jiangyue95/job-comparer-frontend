import { useEffect, useState } from "react"
import { deleteAnalysis, getAnalyses, markAnalysisViewed } from "../api/analysisApi"
import { useAnalysisSummary } from "../context/AnalysisContext"
import { Link } from "react-router-dom"
import AnalysisCard from "../components/AnalysisCard"

function AnalysisHistoryPage() {
    const [analyses, setAnalyses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [expandedId, setExpandedId] = useState(null)
    const { refreshSummary } = useAnalysisSummary()

    // Load analysis list data
    useEffect(() => {
        async function loadAnalysis() {
            try {
                setLoading(true)
                const list = await getAnalyses()
                setAnalyses(list)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadAnalysis()
    }, [])

    async function handleDelete(id) {
        if (!window.confirm('Delete this analysis? This cannot be undone.')) {
            return
        }
        try {
            await deleteAnalysis(id)
            setAnalyses((prev) => prev.filter((a) => a.id !== id))
            refreshSummary()
        } catch (err) {
            setError(err.message)
        }
    }

    function handleToggleExpand(analysis) {
        const willExpand = expandedId !== analysis.id
        setExpandedId(willExpand ? analysis.id : null)

        // Only the first expand needs to reach the server; the endpoint is
        // idempotent, but skipping the call avoids a request per toggle.
        if (willExpand && !analysis.viewedAt) {
            markAnalysisViewed(analysis.id)
                .then(() => {
                    refreshSummary()
                    setAnalyses((prev) =>
                        prev.map((a) =>
                            a.id === analysis.id ? { ...a, viewedAt: new Date().toISOString() } : a
                        )
                    )
                })
                .catch(() => {
                    // Marking as viewed is not worth interrupting the user for.
                })
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading your analysis history...</p>
            </div>
        )
    }

    if (analyses.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
                <p className="text-gray-500">No analysis yet.</p>
                <Link
                    to="/analyze"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition-colors"
                >
                    Go to analyze
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 space-y-4">
                <h1 className="text-2xl font-bold text-gray-900 text-center">Analysis History</h1>

                {error && <p className="text-red-600 text-center">{error}</p>}

                {analyses.map((analysis) => (
                    <AnalysisCard
                        key={analysis.id}
                        analysis={analysis}
                        expanded={expandedId === analysis.id}
                        onToggle={() => handleToggleExpand(analysis)}
                        onDelete={() => handleDelete(analysis.id)}
                    />
                ))}
            </div>
        </div>
    )
}
export default AnalysisHistoryPage
