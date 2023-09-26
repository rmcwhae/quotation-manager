import { Quotation } from '../types/Quotation'
import { fetcher } from './client'

export const fetchQuotations = async () => {
	return await fetcher('/quotations', 'GET')
}

export const postQuotation = async (quotation: Quotation) => {
	return await fetcher('/quotations', 'POST', quotation)
}

export const updateQuotation = async (quotation: Quotation) => {
	return await fetcher(`/quotations/${quotation.id}`, 'PUT', quotation)
}
