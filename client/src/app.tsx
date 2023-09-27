import { useState } from 'preact/hooks'

import { SourceForm } from './components/SourceForm'
import { SourceWithQuotations } from './components/SourceWithQuotations'
import { useSources } from './hooks/use-sources'
import { Source } from './types/Source'

export function App() {
	const { sources, isLoading } = useSources()
	const [selectedSourceId, setSelectedSourceId] = useState<number | null>(
		null
	)
	console.log('selectedSourceId', selectedSourceId)

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<>
			{selectedSourceId ? (
				<>
					<p>Add quotations…</p>
					{sources.map((source: Source) => {
						if (source.id === selectedSourceId) {
							return (
								<SourceWithQuotations
									key={source.id}
									source={source}
									onClick={() => {}}
								/>
							)
						} else {
							return null
						}
					})}
				</>
			) : (
				<>
					<SourceForm />
					{sources.map((source: Source) => {
						return (
							<SourceWithQuotations
								key={source.id}
								source={source}
								onClick={() =>
									setSelectedSourceId(source.id as number)
								}
							/>
						)
					})}
				</>
			)}
		</>
	)
}
