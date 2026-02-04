<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		for?: string;
		children?: Snippet;
	}

	let { class: className = '', for: forId, children, ...rest }: Props = $props();

	const baseClass =
		'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50';
</script>

<label for={forId} class={cn(baseClass, className)} {...rest}>
	{@render children?.()}
</label>
