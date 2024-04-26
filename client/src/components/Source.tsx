import { Source as SourceType } from '../types/Types'
import { QuotationList } from './QuotationList'

export const Source = ({ source }: { source: SourceType }) => {
	return (
		<div key={source.id}>
			<h3>
				{source.url ? (
					<a href={source.url} target="_blank">
						{source.title}
					</a>
				) : (
					<>{source.title}</>
				)}
				{source.publication_year &&
					' (' + source.publication_year + ')'}
			</h3>
			<QuotationList sourceId={source.id} />
		</div>
	)
}
