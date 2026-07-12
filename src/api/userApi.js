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
            const errorBody = await response.json().catch(() => ({}))
            throw new Error(errorBody.message || `HTTP ${response.status}`)
        }

        return null;
    })
}