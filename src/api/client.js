// ---- Module-level state: Global unauthorized handler ----
let unauthorizedHandler = null

export function setUnauthorizedHandler(handler) {
    unauthorizedHandler = handler
}

// ---- Shared error response handling ----
// Always throws. Callers do not need to return after calling it.
export async function throwApiError(response, { skipUnauthorizedHandler = false } = {}) {
    const errorBody = await response.json().catch(() => ({}))

    const error = new Error(errorBody.message || `HTTP ${response.status}`)
    error.status = response.status  // 401 / 403 / 409 ... so callers can branch on it
    error.body = errorBody          // full response body, incl. field-level validation errors

    if (response.status === 401 && !skipUnauthorizedHandler && unauthorizedHandler) {
        unauthorizedHandler()
    }

    throw error
}

// ---- A generic HTTP request function ----
// path: API path, e.g., '/api/auth/login'
// options: { method, body, headers, skipUnauthorizedHandler }
export async function apiRequest(path, options = {}) {
    const {
        method = 'GET',
        body,
        headers = {},
        skipUnauthorizedHandler = false,
    } = options

    // Read the token from localStorage (it will be saved after login)
    const token = localStorage.getItem('token')

    const response = await fetch (path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            // If there is a token, automatically add the Authorization header.
            ...(token && { Authorization: `Bearer ${token}`}),
            ...headers,
        },
        // If there is a body, serialize it into JSON string.
        body: body ? JSON.stringify(body) : undefined,
    })

    // If backend return 4xx / 5xx, throw error
    if (!response.ok) {
        await throwApiError(response, { skipUnauthorizedHandler })
    }

    // 204 No Content, directly return null
    if (response.status === 204) {
        return null
    }

    return response.json()
}