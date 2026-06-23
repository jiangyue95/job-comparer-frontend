import { useState } from "react"
import { createCv, parseCvPdf } from "../api/cvApi"
function CvCreateForm({ onSuccess }) {
    const [cvName, setCvName] = useState('')
    const [content, setContent] = useState('')
    const [submitting, setSubmitting] = useState(false)

    // Error information only belongs to this form
    const [error, setError] = useState('')

    const [parsing, setParsing] = useState(false)
    const [parseError, setParseError] = useState('')

    async function handlePdfUpload(event) {
        const file = event.target.files[0]
        if (!file) {
            return
        }

        setParsing(true)
        setParseError('')
        try {
            const result = await parseCvPdf(file, '', false)
            setCvName(result.name || '')
            setContent(result.rawText || '')
        } catch (err) {
            setError(err.message)
        } finally {
            setParsing(false)
            event.target.value = ''
        }
        
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setSubmitting(true)
        try {
            await createCv(cvName, content)
            // After successful creation: clear form + reload CV list
            setCvName('')
            setContent('')
            onSuccess()
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="border border-dashed order-gray-300 rounded-md p-4 text-center">
                <p className="text-sm text-gray-500 mb-2">
                    Upload a PDF to auto-fill the form
                </p>
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-1.5 px-3 rounded-md transition-colors">
                    {parsing ? 'Parsing...' : 'Upload PDF'}
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                        disabled={parsing}
                        className="hidden"
                    />
                </label>
                {parseError && <p className="text-red-600 text-sm mt-2">{parseError}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    value={cvName}
                    onChange={(e) => setCvName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Give this CV a unique name"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Copy and paste all your CV content"
                />
            </div>
            <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
                {submitting ? 'Creating ...' : 'Create CV'}
            </button>
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
    )
}

export default CvCreateForm