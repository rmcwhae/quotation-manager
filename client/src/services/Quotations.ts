import { Quotation } from '../types/Types'
import { fetcher } from './client'

export const fetchQuotationsBySource = async (id: string) => {
	return await fetcher(`/sources/${id}/quotations`, 'GET')
}

export const postQuotation = async (quotation: Quotation) => {
	return await fetcher('/quotations', 'POST', quotation)
}

export const updateQuotation = async (quotation: Quotation) => {
	return await fetcher(`/quotations/${quotation.ID}`, 'PUT', quotation)
}

export const deleteQuotation = async (quotation: Quotation) => {
	return await fetcher(`/quotations/${quotation.ID}`, 'DELETE')
}
