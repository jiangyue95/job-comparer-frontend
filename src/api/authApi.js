import { apiRequest } from "./client";

export function login(email, password) {
    return apiRequest('/api/auth/login', {
        method: 'POST',
        body: { email, password},
    })
}

export function register(username, email, password) {
    return apiRequest('/api/auth/register', {
        method: 'POST',
        body: { username, email, password },
    })
}

export function getCurrentUser() {
    return apiRequest('/api/users/me', {
        method: 'GET',
    })
}