import { useQuotations } from './hooks/use-quotations'

export function App() {
	const { quotations, isLoading, mutate } = useQuotations()
	console.log('quotations', quotations)
	return (
		<>
			<h3>Quotation Manager</h3>
		</>
	)
}
