import { apiRequest } from "./client";

export function createAnalysis(cvId, jobId) {
    return apiRequest('/api/analyses', {
        method: 'POST',
        body:{ cvId, jobId},
    })
}