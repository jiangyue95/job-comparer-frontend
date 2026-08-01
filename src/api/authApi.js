import { apiRequest } from "./client"

export function login(email, password) {
    return apiRequest('/api/auth/login', {
        method: 'POST',
        body: { email, password},
        // A 401 from the login endpoint means "wrong credentials", not
        // "session expired". Without this exemption, a failed login attempt
        // would log the user out on the login page itself.
        skipUnauthorizedHandler: true,
    })
}

export function register(username, email, password) {
    return apiRequest('/api/auth/register', {
        method: 'POST',
        body: { username, email, password },
        skipUnauthorizedHandler: true,
    })
}

export function getCurrentUser() {
    return apiRequest('/api/users/me', {
        method: 'GET',
    })
}