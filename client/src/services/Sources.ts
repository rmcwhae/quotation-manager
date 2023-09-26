import { Source } from '../types/Source'
import { fetcher } from './client'

export const fetchSources = async () => {
	return await fetcher('/sources', 'GET')
}

export const postSource = async (source: Source) => {
	return await fetcher('/sources', 'POST', source)
}

export const updateSource = async (source: Source) => {
	return await fetcher(`/sources/${source.id}`, 'PUT', source)
}
