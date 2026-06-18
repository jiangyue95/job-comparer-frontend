import { useEffect, useState } from "react";
import { listCvs } from "../api/cvApi";
import { listJobs } from "../api/jobApi";
import { createAnalysis } from "../api/analysisApi";
import { Link } from "react-router-dom";
import AnalysisResult from '../components/AnalysisResult';

function AnalysisPage() {
    // Two dropdown data source
    const [cvs, setCvs] = useState([])
    const [jobs, setJobs] = useState([])
    const [loadingLists, setLoadingLists] = useState(true)

    // User selections
    const [selectedCvId, setSelectedCvId] = useState('')
    const [selectedJobId, setSelectedJobId] = useState('')

    // Submit and result
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')

    // Load two lists in parallel
    useEffect(() => {
        async function loadLists() {
            try {
                setLoadingLists(true)
                const [cvList, jobList] = await Promise.all([listCvs(), listJobs()])
                setCvs(cvList)
                setJobs(jobList)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoadingLists(false)
            }
        }
        loadLists()
    }, [])

    async function handleAnalyze(event) {
        event.preventDefault()
        setError('')
        setResult(null)
        setAnalyzing(true)
        try {
            const data = await createAnalysis(Number(selectedCvId), Number(selectedJobId))
            setResult(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setAnalyzing(false)
        }
    }

    if (loadingLists) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading your CVs and Jobs...</p>
            </div>
        )
    }

    // At least one CV and one job are required to analyze.
    if (cvs.length === 0 || jobs.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-md mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center space-y-4">
                        <h2 className="text-xl font-semibold">Get started</h2>
                        <p className="text-gray-600">
                            You need at least one CV and one Job to run an analysis.
                        </p>
                        <div className="flex gap-3 justify-center pt-2">
                            {cvs.length === 0 && (
                                <Link
                                    to="/cvs"
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                                >
                                    Add a CV
                                </Link>
                            )}
                            {jobs.length === 0 && (
                                <Link
                                    to="/jobs"
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                                >
                                    Add a Job
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full max-w-3xl mx-auto px-4 space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 text-center">Analyze a CV against a Job</h1>
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <form onSubmit={handleAnalyze} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select a CV</label>
                            <select
                                value={selectedCvId}
                                onChange={(e) => setSelectedCvId(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Choose a CV --</option>
                                {cvs.map((cv) => (
                                    <option key={cv.id} value={cv.id}>
                                        {cv.cvName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select a Job</label>
                            <select
                                value={selectedJobId}
                                onChange={(e) => setSelectedJobId(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Choose a Job --</option>
                                {jobs.map((job) => (
                                    <option key={job.id} value={job.id}>
                                        {job.jobTitle} @ {job.company}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            disabled={analyzing}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            {analyzing ? 'Analyzing... (this may take 10-30 seconds)' : 'Analyze'}
                        </button>
                    </form>
                    {error && <p className="text-red-600">{error}</p>}
                </div>

                {result && <AnalysisResult result={result} />}
            </div>
        </div>
    )
}

export default AnalysisPage