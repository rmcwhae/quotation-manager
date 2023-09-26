import useSWR from 'swr'

import { fetchSources } from '../services/Sources'

export const useSources = () => {
	const { data, error, isLoading } = useSWR(`/quotations`, fetchSources)

	return {
		sources: data,
		isLoading,
		isError: error,
	}
}
