import useSWR from 'swr'

import { fetchQuotationsBySource } from '../services/Quotations'
import { Quotation } from '../types/Types'

export const useQuotations = (id: string) => {
	const key = ['sources', id, 'quotations']
	const { data, mutate, isLoading } = useSWR(key, () =>
		fetchQuotationsBySource(id)
	)

	return {
		quotations: data as Quotation[],
		isLoading,
		mutate,
	}
}
