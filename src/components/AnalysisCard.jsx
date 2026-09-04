import AnalysisResult from "./AnalysisResult"
import { AI_PROVIDER_COLORS, AI_PROVIDER_LABELS } from "../constants/aiProvider"

function AnalysisCard({ analysis, expanded, onToggle, onDelete }) {
    const unread = !analysis.viewedAt
    const scoreTextColor =
        analysis.matchScore >= 70 ? 'text-green-600'
        : analysis.matchScore >= 50 ? 'text-yellow-600'
        : 'text-red-600'
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Summary row */}
            <div className="flex items-baseline justify-between gap-3">
                <span className="font-semibold text-gray-900">
                    {unread && (
                        <span className="inline-block align-middle mr-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            New
                        </span>
                    )}
                    {analysis.cvName || 'Unknown CV'} -&gt; {analysis.jobTitle || 'Unknown Job'}
                    {analysis.company ? ` @ ${analysis.company}` : ''}
                </span>
                <span className={`text-lg font-bold ${scoreTextColor}`}>
                    {analysis.matchScore}<span className="text-sm text-gray-500"> / 100</span>
                </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
                {/* Date */}
                <span className="text-xs text-gray-400">
                    {new Date(analysis.createdAt).toLocaleString()}
                </span>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${AI_PROVIDER_COLORS[analysis.aiProvider]}`}>
                    {AI_PROVIDER_LABELS[analysis.aiProvider] ?? analysis.aiProvider}
                </span>
            </div>

            {/* Feedback preview (only when collapsed) */}
            {!expanded && (
                <p className="line-clamp-2 text-sm text-gray-600 mt-2">
                    {analysis.actionableFeedback}
                </p>
            )}

            {/* Expanded full result */}
            {expanded && (
                <div className="mt-4">
                    <AnalysisResult result={analysis} />
                </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
                <button
                    onClick={onToggle}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                    {expanded ? 'Collapse' : 'View details'}
                </button>
                <button
                    onClick={onDelete}
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                    Delete
                </button>
            </div>
        </div>
    ) 
}

export default AnalysisCard
