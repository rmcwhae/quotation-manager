import { ReactNode, useState } from 'react'

import clsx from 'clsx'

export const Collapsible = ({
	title,
	children,
}: {
	title: string
	children: ReactNode
}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<div className="collapse">
				<div
					className={clsx('flex-between', 'cursor-pointer', 'mb-1')}
					onClick={() => setIsOpen(!isOpen)}
				>
					<div>{title}</div>
					<div>{isOpen ? '-' : '+'}</div>
				</div>
				{isOpen && <div className="mt-05">{children}</div>}
			</div>
		</>
	)
}
