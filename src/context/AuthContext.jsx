/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { getCurrentUser } from "../api/authApi"
import { setUnauthorizedHandler } from "../api/client"

// 1. Create context object
const AuthContext = createContext(null)

// 2. Provider component: provide state to all sub component
export function AuthProvider({ children }) {
    // When initializing, read token from localStorage
    // (keep login state, even refresh pages)
    const [token, setToken] = useState(() => localStorage.getItem('token'))
    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(!!token)

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }, [])

    // Register logout as a global 401 handler.
    // The cleanup clears it so client.js does not keep a stale reference
    // after the provider unmounts.
    useEffect(() => {
        setUnauthorizedHandler(logout)
        return () => setUnauthorizedHandler(null)
    }, [logout])

    useEffect(() => {
        if (!token) {
            setUser(null)
            setLoadingUser(false)
            return
        }
        setLoadingUser(true)
        refreshUser()
    }, [token])

    function login(newToken) {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    function refreshUser() {
        return getCurrentUser()
            .then((data) => setUser(data))
            .catch(() => {
                localStorage.removeItem('token')
                setToken(null)
                setUser(null)
            })
            .finally(() => setLoadingUser(false))
    }

    const value = {
        token,
        user,
        isAuthenticated: !!token, // !! transfer any value into boolean
        login,
        logout,
        refreshUser,
        loadingUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// 3. Custom hook: make component use context expediently
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider')
    }
    return context
}