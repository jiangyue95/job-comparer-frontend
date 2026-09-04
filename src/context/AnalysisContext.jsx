/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { getAnalysisSummary } from "../api/analysisApi"
import { useAuth } from "./AuthContext"

const AnalysisContext = createContext(null)

const ACTIVE_INTERVAL = 3000
const IDLE_INTERVAL = 30000

export function AnalysisProvider({ children }) {
    const { isAuthenticated } = useAuth()
    const [summary, setSummary] = useState({ unread: 0, active: 0})

    // Read inside the polling callback, which would otherwise capture a stale
    // value from the render it was created in.
    const summaryRef = useRef(summary)
    useEffect(() => {
        summaryRef.current = summary
    }, [summary])

    const refreshSummary = useCallback(() => {
        if (!isAuthenticated) return Promise.resolve()
        return getAnalysisSummary()
            .then(setSummary)
            .catch(() => {
                // A failed poll is not worth surfacing: the next tick retries.
            })
    }, [isAuthenticated])

    useEffect(() => {
        if (!isAuthenticated) {
            setSummary({ unread: 0, active: 0 })
            return
        }
        
        let timeoutId
        let cancelled = false

        const tick = async () => {
            if (document.visibilityState === 'visible') {
                await refreshSummary()
            }
            if (cancelled) return
            const delay = summaryRef.current.active > 0 ? ACTIVE_INTERVAL : IDLE_INTERVAL
            timeoutId = setTimeout(tick, delay)
        }

        tick()

        // Coming back to the tab should not wait out a 30s idle interval.
        // Restarting the chain instead of firing a bare request keeps a single
        // timer alive and gives back-to-back tab switches nothing to pile up.
        const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                clearTimeout(timeoutId)
                tick()
            }
        }
    
        document.addEventListener('visibilitychange', onVisibilityChange)

        return () => {
            cancelled = true
            clearTimeout(timeoutId)
            document.removeEventListener('visibilitychange', onVisibilityChange)
        }
    }, [isAuthenticated, refreshSummary])

    const value = { summary, refreshSummary }

    return (
        <AnalysisContext.Provider value={value}>
            {children}
        </AnalysisContext.Provider>
    )
}

export function useAnalysisSummary() {
    const context = useContext(AnalysisContext)
    if (!context) {
        throw new Error('useAnalysisSummary must be used inside AnalysisProvider')
    }
    return context
}
