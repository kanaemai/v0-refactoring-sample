export function cn(...inputs: (string | undefined | null | false)[]): string {
	return inputs
		.flat()
		.filter((x): x is string => typeof x === 'string' && x.length > 0)
		.join(' ');
}
