<script lang="ts">
	import { cn } from '$lib/utils';
	import { Check } from 'lucide-svelte';

	interface Props {
		class?: string;
		checked?: boolean;
		disabled?: boolean;
		[id: string]: unknown;
	}

	let {
		class: className = '',
		checked = false,
		disabled = false,
		...rest
	}: Props = $props();

	const boxClass = $derived(
		cn(
			'peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none flex items-center justify-center cursor-pointer',
			'border-input dark:bg-input/30',
			'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
			checked && 'bg-primary border-primary text-primary-foreground',
			className
		)
	);
</script>

<label class="relative inline-flex cursor-pointer">
	<input
		type="checkbox"
		class="sr-only peer"
		bind:checked
		{disabled}
		{...rest}
	/>
	<span class={boxClass} aria-hidden="true">
		{#if checked}
			<Check class="size-3.5" />
		{/if}
	</span>
</label>
