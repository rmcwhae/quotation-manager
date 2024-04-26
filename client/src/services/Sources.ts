import { Source } from '../types/Types'
import { fetcher } from './client'

// NO direct get for Sources (combined with Authors)

export const postSource = async (source: Source) => {
	return await fetcher('/sources', 'POST', source)
}

export const updateSource = async (source: Source) => {
	return await fetcher(`/sources/${source.ID}`, 'PUT', source)
}

export const deleteSource = async (source: Source) => {
	return await fetcher(`/sources/${source.ID}`, 'DELETE')
}
