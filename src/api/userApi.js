import { throwApiError } from "./client"

export function uploadAvatar(file) {
    const token = localStorage.getItem('token')

    const formData = new FormData();
    formData.append('file', file);

    return fetch('/api/users/me/avatar', {
        method: 'POST',
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
    }).then(async response => {
        if (!response.ok) {
            await throwApiError(response)
        }

        return null;
    })
}