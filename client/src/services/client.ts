const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

export const fetcher = async (url: string, method: string, body?: any) => {
	const response = await fetch(API_URL + url, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'X-API-KEY': API_KEY,
		},
		body: body ? JSON.stringify(body) : null,
	})

	return response.json()
}
