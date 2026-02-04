<script lang="ts">
	import { goto } from '$app/navigation';
	import { ChevronRight, Filter, ArrowUpDown } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { Property, PropertyStatus } from '$lib/types';

	interface Props {
		properties: Property[];
	}

	let { properties }: Props = $props();

	function formatCurrency(value: number): string {
		return `¥${value.toLocaleString()}`;
	}

	const statusStyles: Record<PropertyStatus, string> = {
		販売中: 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30',
		取得済: 'bg-muted text-muted-foreground border border-border',
		リノベ中: 'bg-muted text-muted-foreground border border-border',
		成約済: 'bg-muted text-muted-foreground border border-border'
	};

	function handleRowClick(id: string) {
		goto(`/assessment/${id}`);
	}
</script>

<div>
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-lg font-semibold text-foreground">案件一覧</h2>
		<Button variant="outline" class="gap-2 bg-transparent">
			<Filter class="w-4 h-4" />
			ステータス
		</Button>
	</div>

	<div class="bg-card rounded-lg border border-border overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead>
					<tr class="border-b border-border bg-muted/50">
						<th class="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
							<div class="flex items-center gap-1">
								物件名
								<ArrowUpDown class="w-3 h-3" />
							</div>
						</th>
						<th class="text-left px-4 py-4 text-sm font-medium text-muted-foreground">
							ステータス
						</th>
						<th class="text-right px-4 py-4 text-sm font-medium text-muted-foreground">
							<div class="flex items-center justify-end gap-1">
								取得価格
								<ArrowUpDown class="w-3 h-3" />
							</div>
						</th>
						<th class="text-right px-4 py-4 text-sm font-medium text-muted-foreground">
							総コスト
						</th>
						<th class="text-right px-4 py-4 text-sm font-medium text-muted-foreground">
							<div class="flex items-center justify-end gap-1">
								想定売却価格
								<ArrowUpDown class="w-3 h-3" />
							</div>
						</th>
						<th class="text-right px-4 py-4 text-sm font-medium text-muted-foreground">
							粗利
						</th>
						<th class="text-right px-4 py-4 text-sm font-medium text-muted-foreground">
							<div class="flex items-center justify-end gap-1">
								利益率
								<ArrowUpDown class="w-3 h-3" />
							</div>
						</th>
						<th class="px-4 py-4"></th>
					</tr>
				</thead>
				<tbody>
					{#each properties as property (property.id)}
						<tr
							role="button"
							tabindex="0"
							class="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
							onclick={() => handleRowClick(property.id)}
							onkeydown={(e) => e.key === 'Enter' && handleRowClick(property.id)}
						>
							<td class="px-6 py-4">
								<div>
									<p class="font-medium text-foreground">{property.name}</p>
									<p class="text-sm text-muted-foreground">{property.address}</p>
								</div>
							</td>
							<td class="px-4 py-4">
								<span
									class="px-3 py-1 rounded text-xs font-medium {statusStyles[property.status]}"
								>
									{property.status}
								</span>
							</td>
							<td class="px-4 py-4 text-right font-mono text-foreground">
								{formatCurrency(property.acquisitionPrice)}
							</td>
							<td class="px-4 py-4 text-right font-mono text-foreground">
								{formatCurrency(property.totalCost)}
							</td>
							<td class="px-4 py-4 text-right font-mono text-foreground">
								{formatCurrency(property.estimatedSalePrice)}
							</td>
							<td class="px-4 py-4 text-right font-mono text-foreground">
								{formatCurrency(property.grossProfit)}
							</td>
							<td class="px-4 py-4 text-right font-mono text-emerald-600 font-medium">
								{property.profitRate.toFixed(1)}%
							</td>
							<td class="px-4 py-4">
								<ChevronRight class="w-5 h-5 text-muted-foreground" />
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
