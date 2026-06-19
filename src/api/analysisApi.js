import { apiRequest } from "./client";

export function createAnalysis(cvId, jobId) {
    return apiRequest('/api/analyses', {
        method: 'POST',
        body:{ cvId, jobId},
    })
}

export function getAnalyses() {
    return apiRequest('/api/analyses', {
        method: 'GET',
    })
}

export function deleteAnalysis(id) {
    return apiRequest(`/api/analyses/${id}`, {
        method: 'DELETE',
    })
}