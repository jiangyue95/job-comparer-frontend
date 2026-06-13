import { apiRequest } from "./client"

export function listJobs() {
    return apiRequest('/api/jobs')
}

export function getJob(id) {
    return apiRequest(`/api/jobs/${id}`)
}

export function createJob(job) {
    return apiRequest('/api/jobs',{
        method: 'POST',
        body: job,
    })
}

export function updateJob(id, job) {
    return apiRequest(`/api/jobs/${id}`, {
        method: 'PUT',
        body: job,
    })
}

export function deleteJob(id) {
    return apiRequest(`/api/jobs/${id}`, {
        method: 'DELETE',
    })
}