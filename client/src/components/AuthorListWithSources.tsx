import { useAuthors } from '../hooks/use-authors-sources'
import { Author } from '../types/Types'
import { Source } from './Source'

export const AuthorListWithSources = () => {
	const { authors, isLoading } = useAuthors()

	if (isLoading) {
		return <div>Loading...</div>
	}

	return authors.map((author: Author) => (
		<div key={author.id}>
			<h2>{author.name}</h2>
			{author.sources.map(source => (
				<Source key={source.id} source={source} />
			))}
		</div>
	))
}
