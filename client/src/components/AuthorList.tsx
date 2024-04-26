import { useAuthors } from '../hooks/use-authors-sources'
import { Author, Source } from '../types/Types'

export const AuthorList = () => {
	const { authors } = useAuthors()
	console.log('authors', authors)

	return (
		<div>
			{authors &&
				authors.map((author: Author) => (
					<div key={author.id}>
						<h2>{author.name}</h2>
						<ul>
							{author.sources.map((source: Source) => (
								<li key={source.id}>{source.title}</li>
							))}
						</ul>
					</div>
				))}
		</div>
	)
}
