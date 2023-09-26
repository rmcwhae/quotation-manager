import useSWR from 'swr'

import { fetchQuotations } from '../services/Quotations'

export const useQuotations = () => {
	const { data, error, isLoading } = useSWR(`/quotations`, fetchQuotations)

	return {
		quotations: data,
		isLoading,
		isError: error,
	}
}
