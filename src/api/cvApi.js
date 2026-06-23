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

export function parseCvPdf(file, cvName, save) {
    const token = localStorage.getItem('token')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('cvName', cvName)
    formData.append('save', save)

    return fetch('/api/cvs/parse-pdf', {
        method: 'POST',
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
    }).then(async response => {
        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}))
            throw new Error(errorBody.message || `HTTP ${response.status}`)
        }
        return response.json()
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