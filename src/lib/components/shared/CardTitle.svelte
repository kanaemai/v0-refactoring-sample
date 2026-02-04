<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div data-slot="card-title" class={cn('leading-none font-semibold', className)}>
	{@render children?.()}
</div>
