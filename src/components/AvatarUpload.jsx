import { useState } from "react";
import { uploadAvatar } from "../api/userApi"
import { useAuth } from "../context/AuthContext"

function AvatarUpload({ onUploaded }) {
    const { refreshUser } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    function handleFileChange(e) {
        setSelectedFile(e.target.files[0])
        setError('')
    }

    async function handleUpload() {
        if (!selectedFile) return
        try {
            setUploading(true)
            await uploadAvatar(selectedFile)
            await refreshUser()
            setSelectedFile(null)
            setError('')
            onUploaded?.()
        } catch (err) {
            setError(err.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            <input type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />

            <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
            >
                {uploading ? 'Uploading...' : 'Upload Avatar'}
            </button>

            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}

export default AvatarUpload