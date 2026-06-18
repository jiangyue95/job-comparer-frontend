function AnalysisResult({ result }) {
    const scoreColor = result.matchScore >= 70 ? 'bg-green-600' : result.matchScore >= 50 ? 'bg-yellow-500' : 'bg-red-600'

    return (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold">Analysis Result</h2>
            <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-gray-700">Match Score</span>
                <span className="text-2xl font-bold text-gray-900">
                    {result.matchScore}<span className="text-lg text-gray-500"> / 100</span>
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                    className={`${scoreColor} h-3 rounded-full transition-all`}
                    style={{ width: `${result.matchScore}%` }}
                />
            </div>
            <div className="divide-y divide-gray-200">
                <div className="py-4">
                    <h3 className="text-lg font-semibold text-green-700">Matched Skills</h3>
                    <p className="whitespace-pre-wrap">{result.matchedSkills}</p>
                </div>
                <div className="py-4">
                    <h3 className="text-lg font-semibold text-red-700">Missing Skills</h3>
                    <p className="whitespace-pre-wrap">{result.missingSkills}</p>
                </div>
                <div className="py-4">
                    <h3 className="text-lg font-semibold text-blue-700">Actionable Feedback</h3>
                    <p className="whitespace-pre-wrap">{result.actionableFeedback}</p>
                </div>
            </div>
        </div>
    )
}

export default AnalysisResult
