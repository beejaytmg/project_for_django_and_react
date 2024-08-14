import { useAuth } from '../hooks/useAuth'

export async function authenticatedFetch(url, options = {}) {
  const { accessToken, refreshAccessToken, logout } = useAuth()

  if (!accessToken) {
    throw new Error('No access token available')
  }

  const fetchOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    },
  }

  let response = await fetch(url, fetchOptions)

  if (response.status === 401) {
    // Token has expired, try to refresh
    const refreshSuccess = await refreshAccessToken()
    if (refreshSuccess) {
      // Retry the original request with the new token
      fetchOptions.headers['Authorization'] = `Bearer ${accessToken}`
      response = await fetch(url, fetchOptions)
    } else {
      // Refresh failed, log out the user
      logout()
      throw new Error('Session expired. Please log in again.')
    }
  }

  return response
}