<script lang="ts">
	import { cn } from '$lib/utils';
	import { ChevronDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface SelectOption {
		value: string;
		label: string;
	}

	interface Props {
		class?: string;
		options?: SelectOption[];
		value?: string;
		placeholder?: string;
		children?: Snippet;
		[id: string]: unknown;
	}

	let {
		class: className = '',
		options = [],
		value = $bindable(''),
		placeholder = '選択',
		children,
		...rest
	}: Props = $props();

	const triggerClass =
		'border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-9 min-w-[8rem]';
</script>

<div class={cn('relative', className)}>
	<select class={cn(triggerClass, 'pr-8')} bind:value {...rest}>
		{#if placeholder}
			<option value="" disabled>{placeholder}</option>
		{/if}
		{#if options.length > 0}
			{#each options as opt (opt.value)}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		{:else}
			{@render children?.()}
		{/if}
	</select>
	<span class="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground">
		<ChevronDown class="size-4" />
	</span>
</div>
