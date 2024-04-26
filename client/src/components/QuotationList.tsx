import { useQuotations } from '../hooks/use-quotations'
import { Quotation } from './Quotation'

export const QuotationList = ({ sourceId }: { sourceId: number }) => {
	const { quotations, isLoading } = useQuotations(sourceId)

	if (isLoading) {
		return <div>Loading...</div>
	}

	return quotations.map(quotation => (
		<Quotation key={quotation.id} quotation={quotation} />
	))
}
