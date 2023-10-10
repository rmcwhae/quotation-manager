import { useForm, SubmitHandler } from 'react-hook-form'
import { Source } from '../types/Source'
import { postSource } from '../services/Sources'
import { useSources } from '../hooks/use-sources'

export const SourceForm = () => {
	const {
		register,
		handleSubmit,
		// formState: { errors },
	} = useForm<Source>()
	const { mutate } = useSources()

	const onSubmit: SubmitHandler<Source> = async data => {
		await postSource(data)
		mutate()
	}

	return (
		<div className="form-outline">
			<h3 className="centered">Add a source</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex">
					<input
						{...register('title', { required: true })}
						placeholder="Title"
					/>
					{/* {errors.title && <span>Required</span>} */}
					<input
						{...register('author', { required: true })}
						placeholder="Author"
					/>
					<input {...register('url')} placeholder="URL" />
				</div>
				<button type="submit" className="submit">
					Submit
				</button>
			</form>
		</div>
	)
}

const styles = {
	flex: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 'var(--s-1)',
	},
}
