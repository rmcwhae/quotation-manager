import useSWR from 'swr'

import { fetchSources } from '../services/Sources'

export const useSources = () => {
	const { data, mutate, isLoading } = useSWR(`/quotations`, fetchSources)

	return {
		sources: data,
		isLoading,
		mutate,
	}
}
