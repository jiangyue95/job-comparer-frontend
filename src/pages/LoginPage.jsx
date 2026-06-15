import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login as apiLogin } from "../api/authApi"
import { useAuth } from '../context/AuthContext'

function LoginPage() {
    // Three states: input email, password, error message
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    const { login } = useAuth()

    // Used for jumping to other pages
    const navigate = useNavigate()

    // Form submit handler function
    async function handleSubmit(event) {
        event.preventDefault()  // Prevent the form default page refresh action
        setError('')
        setLoading(true)

        try {
            const data = await apiLogin(email, password)
            // Login successfully: save token, jump to dashboard
            login(data.token)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Sign in to Job Comparer
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        {loading ? 'Logging in..' : 'Login'}
                    </button>
                </form>

                {error && (
                    <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
                )}

                <p className="mt-4 text-sm text-gray-600 text-center">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-800">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage