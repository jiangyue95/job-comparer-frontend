import { apiRequest } from "./client"

export function listCvs() {
    return apiRequest("/api/cvs")
}

export function getCv(id) {
    return apiRequest(`/api/cvs/${id}`)
}

export function createCv(cvName, content) {
    return apiRequest('/api/cvs', {
        method: 'POST',
        body: { cvName, content },
    })
}

export function updateCv(id, cvName, content) {
    return apiRequest(`/api/cvs/${id}`, {
        method: 'PUT',
        body: { cvName, content },
    })
}

export function deleteCv(id) {
    return apiRequest(`/api/cvs/${id}`, {
        method: 'DELETE',
    })
}