import { useAuthors } from '../hooks/use-authors-sources'
import { Author, Source } from '../types/Types'
import { QuotationList } from './QuotationList'

export const AuthorList = () => {
	const { authors, isLoading } = useAuthors()

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div>
			{authors.map((author: Author) => (
				<div key={author.id}>
					<h2>{author.name}</h2>
					{author.sources.map((source: Source) => (
						<div key={source.id}>
							<h3>
								{source.url ? (
									<a href={source.url} target="_blank">
										{source.title}
									</a>
								) : (
									<>{source.title}</>
								)}
							</h3>
							<QuotationList sourceId={source.id} />
						</div>
					))}
				</div>
			))}
		</div>
	)
}
