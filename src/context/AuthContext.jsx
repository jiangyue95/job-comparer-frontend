/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/authApi";

// 1. Create context object
const AuthContext = createContext(null)

// 2. Provider component: provide state to all sub component
export function AuthProvider({ children }) {
    // When initializing, read token from localStorage
    // (keep login state, even refresh pages)
    const [token, setToken] = useState(() => localStorage.getItem('token'))
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (!token) {
            setUser(null)
            return
        }
        getCurrentUser()
            .then((data) => setUser(data))
            .catch(() => {
                // token could expire: clear login state
                localStorage.removeItem('token')
                setToken(null)
                setUser(null)
            })
    }, [token])

    function login(newToken) {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    function logout() {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    const value = {
        token,
        user,
        isAuthenticated: !!token, // !! transfer any value into boolean
        login,
        logout,
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