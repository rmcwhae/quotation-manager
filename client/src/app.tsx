import { SourceForm } from './components/SourceForm'
import { SourceWithQuotations } from './components/SourceWithQuotations'
import { useSources } from './hooks/use-sources'
import { Source } from './types/Source'

export function App() {
	const { sources, isLoading } = useSources()

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<>
			<SourceForm />
			{sources.map((source: Source) => (
				<SourceWithQuotations key={source.id} source={source} />
			))}
		</>
	)
}
