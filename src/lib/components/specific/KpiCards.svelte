<script lang="ts">
	import Card from '$lib/components/shared/Card.svelte';

	export interface CalculatedValues {
		grossProfit: number;
		profitRate: number;
		capRate: number;
		depreciationYears: number;
	}

	interface Props {
		values: CalculatedValues;
	}

	let { values }: Props = $props();

	function formatCurrencyMan(value: number): string {
		const inMan = value / 10000;
		return `${inMan.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}万円`;
	}

	const kpis = $derived([
		{
			label: '粗利益(税込)',
			value: formatCurrencyMan(values.grossProfit),
			valueColor: 'text-blue-600'
		},
		{
			label: '利益率',
			value: `${values.profitRate.toFixed(1)}%`,
			valueColor: 'text-foreground'
		},
		{
			label: '表面利回り',
			value: `${values.capRate.toFixed(2)}%`,
			valueColor: 'text-foreground'
		},
		{
			label: '償却/残存',
			value: `${values.depreciationYears}年`,
			valueColor: 'text-foreground'
		}
	]);
</script>

<div class="mb-6 grid grid-cols-4 gap-4">
	{#each kpis as kpi (kpi.label)}
		<Card class="border border-border p-4 text-center">
			<p class="mb-1 text-xs text-muted-foreground">{kpi.label}</p>
			<p class="text-xl font-bold {kpi.valueColor}">{kpi.value}</p>
		</Card>
	{/each}
</div>
