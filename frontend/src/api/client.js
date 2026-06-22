const BASE_URL = "http://localhost:5000/api"

export async function apiRequest(endpoint, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json()

  if (!res.ok) {
    const error = new Error(data.message || "Request failed")
    error.statusCode = res.status
    throw error
  }

  return data
}