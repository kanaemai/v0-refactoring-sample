<script lang="ts">
	import Card from '$lib/components/shared/Card.svelte';

	interface BreakdownItem {
		label: string;
		value: number;
		note?: string;
		isHeader?: boolean;
		isSubtotal?: boolean;
		highlight?: boolean;
	}

	interface Props {
		salePrice: number;
		purchasePrice: number;
		renovationCost: number;
		buildingRatio: number;
	}

	let { salePrice, purchasePrice, renovationCost, buildingRatio }: Props = $props();

	function formatCurrency(value: number): string {
		return value.toLocaleString();
	}

	const brokerageFee = $derived(Math.floor(salePrice * 0.03 + 60000)); // 3% + 6万円
	const registrationTax = $derived(Math.floor(purchasePrice * 0.02)); // 2%
	const acquisitionTax = $derived(Math.floor(purchasePrice * 0.04)); // 4%
	const stampDuty = 30000;
	const otherCosts = $derived(Math.floor(purchasePrice * 0.015)); // 1.5%

	const totalCost = $derived(
		purchasePrice +
			renovationCost +
			brokerageFee +
			registrationTax +
			acquisitionTax +
			stampDuty +
			otherCosts
	);

	// Tax calculation (簡易計算 - 課税売上割合 35%想定)
	const taxDeductible = $derived(Math.floor(salePrice * 0.1 * 0.35 * 0.1)); // 消費税控除対象外

	const breakdownItems: BreakdownItem[] = $derived([
		{ label: '① 売上高（税込）', value: salePrice, isHeader: true, highlight: true },
		{ label: '② 総原価', value: totalCost, isSubtotal: true, note: '仕入+費用' },
		{ label: '仕入価格', value: purchasePrice, note: `建物${(buildingRatio * 100).toFixed(1)}%` },
		{ label: '改修費', value: renovationCost },
		{ label: '仲介手数料', value: brokerageFee },
		{ label: '登録免許税', value: registrationTax },
		{ label: '不動産取得税', value: acquisitionTax },
		{ label: 'その他費用(印紙・融資等)', value: otherCosts },
		{
			label: '控除対象外消費税',
			value: taxDeductible,
			note: '課税売上割合 35%想定',
			highlight: true
		}
	]);
</script>

<Card class="border border-border p-5">
	<h3 class="mb-4 font-semibold text-foreground">収支内訳</h3>
	<div class="overflow-x-auto">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-border">
					<th class="py-2 text-left font-medium text-muted-foreground">項目</th>
					<th class="py-2 text-right font-medium text-muted-foreground">金額 (円)</th>
					<th class="py-2 text-right font-medium text-muted-foreground">備考</th>
				</tr>
			</thead>
			<tbody>
				{#each breakdownItems as item (item.label)}
					<tr class="border-b border-border last:border-0">
						<td
							class="py-2.5 {item.isHeader || item.isSubtotal ? 'font-medium' : ''} {item.highlight
								? 'text-blue-600'
								: 'text-foreground'}"
						>
							{item.label}
						</td>
						<td
							class="py-2.5 text-right font-mono {item.highlight
								? 'text-blue-600'
								: 'text-foreground'}"
						>
							{formatCurrency(item.value)}
						</td>
						<td class="py-2.5 text-right text-xs text-muted-foreground">{item.note || ''}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Card>
