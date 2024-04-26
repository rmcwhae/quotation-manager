import useSWR from 'swr'

import { fetchAuthors } from '../services/Authors'
import { Author } from '../types/Types'

export const useAuthors = () => {
	const { data, mutate, isLoading } = useSWR(`/authors`, fetchAuthors)

	return {
		authors: data as Author[],
		isLoading,
		mutate,
	}
}
