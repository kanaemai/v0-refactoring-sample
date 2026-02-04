<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div data-slot="card-footer" class={cn('flex items-center px-6 [.border-t]:pt-6', className)}>
	{@render children?.()}
</div>
