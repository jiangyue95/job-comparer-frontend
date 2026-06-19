import { useEffect, useState } from "react"
import { getAnalyses } from "../api/analysisApi"
import { Link } from "react-router-dom"
import AnalysisResult from "../components/AnalysisResult"

function AnalysisHistoryPage() {
    const [analyses, setAnalyses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [expandedId, setExpandedId] = useState(null)

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

                {analyses.map((analysis) => {
                    const scoreTextColor =
                        analysis.matchScore >= 70 ? 'text-green-600'
                        : analysis.matchScore >= 50 ? 'text-yellow-600'
                        : 'text-red-600'
                    
                    return (
                        <div
                            key={analysis.id}
                            className="bg-white rounded-lg shadow-md p-6"
                        >
                            {/* Summary row */}
                            <div className="flex items-baseline justify-between">
                                <span className="font-semibold text-gray-900">
                                    {analysis.cvName || 'Unknown CV'} -&gt; {analysis.jobTitle || 'Unknown Job'}
                                    {analysis.company ? ` @ ${analysis.company}` : ''}
                                </span>
                                <span className={`text-lg font-bold ${scoreTextColor}`}>
                                    {analysis.matchScore}<span className="text-sm text-gray-500"> / 100</span>
                                </span>
                            </div>

                            {/* Date */}
                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(analysis.createdAt).toLocaleString()}
                            </p>

                            {/* Feedback preview (only when collapsed) */}
                            {expandedId !== analysis.id && (
                                <p className="line-clamp-2 text-sm text-gray-600 mt-2">
                                    {analysis.actionableFeedback}
                                </p>
                            )}

                            {/* Expanded full result */}
                            {expandedId === analysis.id && (
                                <div className="mt-4">
                                    <AnalysisResult result={analysis} />
                                </div>
                            )}

                            {/* Action buttons */}
                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => setExpandedId(expandedId === analysis.id ? null : analysis.id)}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    {expandedId === analysis.id ? 'Collapse' : 'View details'}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default AnalysisHistoryPage