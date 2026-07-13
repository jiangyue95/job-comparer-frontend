import { useAuth } from "../context/AuthContext"
import AvatarUpload from "../components/AvatarUpload";

function ProfilePage() {
    const { user } = useAuth()

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

                    <AvatarUpload />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage