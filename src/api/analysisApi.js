import { apiRequest } from "./client";

export function createAnalysis(cvId, jobId, aiProvider) {
    return apiRequest('/api/analyses', {
        method: 'POST',
        body:{ cvId, jobId, aiProvider },
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
