<script lang="ts">
	import { FileText, Target, TrendingUp, Wallet } from 'lucide-svelte';
	import Card from '$lib/components/shared/Card.svelte';
	import type { Property } from '$lib/types';

	interface Props {
		properties: Property[];
	}

	let { properties }: Props = $props();

	function formatCurrency(value: number): string {
		const inMan = value / 10000;
		return `¥${inMan.toLocaleString()}万`;
	}

	const activeDeals = $derived(properties.filter((p) => p.status !== '成約済').length);
	const avgProfitRate = $derived(
		properties.length > 0
			? properties.reduce((sum, p) => sum + p.profitRate, 0) / properties.length
			: 0
	);
	const totalEstimatedProfit = $derived(properties.reduce((sum, p) => sum + p.grossProfit, 0));
	const confirmedProfit = $derived(
		properties.filter((p) => p.status === '成約済').reduce((sum, p) => sum + p.grossProfit, 0)
	);

	const cards = $derived([
		{
			label: '進行中案件',
			value: `${activeDeals}`,
			unit: '件',
			icon: FileText,
			valueColor: 'text-emerald-600'
		},
		{
			label: '平均利益率',
			value: avgProfitRate.toFixed(1),
			unit: '%',
			icon: Target,
			valueColor: 'text-foreground'
		},
		{
			label: '想定総利益',
			value: formatCurrency(totalEstimatedProfit),
			unit: '',
			icon: TrendingUp,
			valueColor: 'text-emerald-600'
		},
		{
			label: '確定利益',
			value: formatCurrency(confirmedProfit),
			unit: '',
			icon: Wallet,
			valueColor: 'text-emerald-600'
		}
	]);
</script>

<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#each cards as card (card.label)}
		{@const Icon = card.icon}
		<Card class="border border-border bg-card p-5">
			<div class="flex items-start justify-between">
				<div>
					<p class="mb-2 text-sm text-muted-foreground">{card.label}</p>
					<div class="flex items-baseline gap-1">
						<span class="text-3xl font-bold {card.valueColor}">
							{card.value}
						</span>
						{#if card.unit}
							<span class="text-lg text-muted-foreground">{card.unit}</span>
						{/if}
					</div>
				</div>
				<div class="rounded-lg bg-muted p-2">
					<Icon class="h-5 w-5 text-muted-foreground" />
				</div>
			</div>
		</Card>
	{/each}
</div>
