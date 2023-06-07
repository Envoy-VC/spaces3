interface Props {
	fill?: string;
	size?: number;
	height?: number;
	width?: number;
	className?: string;
}

const RightArrows = ({
	fill = 'currentColor',
	size,
	height,
	width,
	className,
}: Props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size || width || 24}
			height={size || height || 24}
			viewBox='0 0 24 24'
			className={className}
		>
			<path
				d='M10.296 7.71 14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z'
				fill={fill}
			/>
			<path
				d='M6.704 6.29 5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z'
				fill={fill}
			/>
		</svg>
	);
};

export default RightArrows;
