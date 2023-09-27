import { useForm } from 'react-hook-form'

export const SourceForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	return (
		<div>
			<h3 className="centered">Add a source</h3>
			<form
				onSubmit={handleSubmit(data => console.log(data))}
				style={styles.wrapper}
			>
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
		gap: 'var(--s-1)',
	},
}
