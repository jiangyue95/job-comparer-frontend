// A generic HTTP request function
// path: API path, e.g., '/api/auth/login'
// options: { method, body, ...} configuration
export async function apiRequest(path, options = {}) {
    const { method = 'GET', body, headers = {} } = options

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
        const errorBody = await response.json().catch(() => ({}))
        throw new Error(errorBody.message || `HTTP ${response.status}`)
    }

    // 204 No Content, directly return null
    if (response.status === 204) {
        return null
    }

    return response.json()
}