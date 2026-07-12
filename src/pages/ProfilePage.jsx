import { useState } from "react"
import { uploadAvatar } from "../api/userApi"
import { useAuth } from "../context/AuthContext"

function ProfilePage() {

    const { user, refreshUser } = useAuth()
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
        } catch (err) {
            setError(err.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full max-w-2xl mx-auto px-4 space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 text-center">My Profile</h1>

                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    {/* Current avatar: avatarUrl exists show avatar, otherwise show placeholder */}
                    {user?.avatarUrl ? (
                        <img src={user.avatarUrl} alt="avatar"
                            className="w-24 h-24 rounded-full object-cover" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No avatar
                        </div>
                    )}

                    {/* User info */}
                    <div>
                        <p className="text-gray-900 font-semibold">{user?.username}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    {/* select file + upload */}
                    <input type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />

                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                    >
                        {uploading ? "Uploading..." : 'Upload Avatar'}
                    </button>

                    {error && <p className="text-red-600">{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage