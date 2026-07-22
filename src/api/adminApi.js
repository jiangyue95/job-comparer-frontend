import { apiRequest } from "./client"

export function getAuditLogs({ action, email, from, to, page = 0, size = 20 } = {}) {
    const query = new URLSearchParams()
    if (action) query.set('action', action)
    if (email) query.set('email', email)
    if (from) query.set('from', `${from}T00:00:00`)
    if (to)   query.set('to',   `${to}T23:59:59`)
    query.set('page', page)
    query.set('size', size)

    return apiRequest(`/api/admin/audit-logs?${query}`)
}

export function getUsers({ page = 0, size = 20 } = {}) {
    const query = new URLSearchParams()
    query.set('page', page)
    query.set('size', size)
    query.set('sort', 'createdAt,desc')

    return apiRequest(`/api/admin/users?${query}`)
}
