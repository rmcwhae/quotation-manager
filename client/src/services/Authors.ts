import { Author } from '../types/Types'
import { fetcher } from './client'

export const fetchAuthors = async () => {
	return await fetcher('/authors', 'GET')
}

export const postAuthor = async (author: Author) => {
	return await fetcher('/authors', 'POST', author)
}

export const updateAuthor = async (author: Author) => {
	return await fetcher(`/authors/${author.ID}`, 'PUT', author)
}

export const deleteAuthor = async (author: Author) => {
	return await fetcher(`/authors/${author.ID}`, 'DELETE')
}
