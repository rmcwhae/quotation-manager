import { useForm, SubmitHandler } from 'react-hook-form'
import { Source } from '../types/Source'
import { postSource } from '../services/Sources'
import { useSources } from '../hooks/use-sources'

export const SourceForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Source>()
	const { mutate } = useSources()

	const onSubmit: SubmitHandler<Source> = async data => {
		await postSource(data)
		mutate()
	}

	return (
		<div>
			<h3 className="centered">Add a source</h3>
			<form onSubmit={handleSubmit(onSubmit)} style={styles.wrapper}>
				<input
					{...register('title', { required: true })}
					placeholder="Title"
				/>
				{/* {errors.title && <span>Required</span>} */}
				<input
					{...register('author', { required: true })}
					placeholder="Author"
				/>
				{/* {errors.author && <span>Required</span>} */}
				<input {...register('url')} placeholder="URL" />
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}

const styles = {
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 'var(--s-1)',
	},
}
