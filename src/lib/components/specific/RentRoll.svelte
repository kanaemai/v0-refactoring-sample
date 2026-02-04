<script lang="ts">
	import { Plus, Trash2 } from 'lucide-svelte';
	import Card from '$lib/components/shared/Card.svelte';
	import Button from '$lib/components/shared/Button.svelte';
	import Checkbox from '$lib/components/shared/Checkbox.svelte';
	import type { RentRollItem } from '$lib/types';

	interface Props {
		items: RentRollItem[];
		onUpdate: (items: RentRollItem[]) => void;
	}

	let { items, onUpdate }: Props = $props();

	function formatCurrency(value: number): string {
		return `¥${value.toLocaleString()}`;
	}

	const monthlyTotal = $derived(
		items.reduce((sum, item) => sum + (item.occupied ? item.currentRent : 0), 0)
	);
	const occupiedCount = $derived(items.filter((item) => item.occupied).length);

	function handleItemChange(
		id: string,
		field: keyof RentRollItem,
		value: string | number | boolean
	) {
		onUpdate(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
	}

	function addRow() {
		const newItem: RentRollItem = {
			id: Date.now().toString(),
			roomNumber: '',
			area: 0,
			currentRent: 0,
			estimatedRent: 0,
			occupied: false
		};
		onUpdate([...items, newItem]);
	}

	function removeRow(id: string) {
		onUpdate(items.filter((item) => item.id !== id));
	}

	const inputBase =
		'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive';
</script>

<Card class="border border-border p-5">
	<div class="mb-4 flex items-center justify-between">
		<h3 class="font-semibold text-foreground">レントロール (住戸)</h3>
		<p class="text-sm text-muted-foreground">
			月額合計:
			<span class="font-medium text-foreground">{formatCurrency(monthlyTotal)}</span>
			/
			{occupiedCount}戸
		</p>
	</div>

	<div class="overflow-x-auto">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-border">
					<th class="py-2 text-left font-medium text-muted-foreground">号室</th>
					<th class="py-2 text-center font-medium text-muted-foreground">面積(㎡)</th>
					<th class="py-2 text-center font-medium text-muted-foreground">現況賃料</th>
					<th class="py-2 text-center font-medium text-muted-foreground">想定賃料</th>
					<th class="py-2 text-center font-medium text-muted-foreground">入居</th>
					<th class="w-10 py-2"></th>
				</tr>
			</thead>
			<tbody>
				{#each items as item (item.id)}
					<tr class="border-b border-border last:border-0">
						<td class="py-2">
							<input
								class="{inputBase} h-8 w-20 text-center"
								value={item.roomNumber}
								oninput={(e) =>
									handleItemChange(
										item.id,
										'roomNumber',
										(e.currentTarget as HTMLInputElement).value
									)}
							/>
						</td>
						<td class="py-2">
							<input
								type="number"
								class="{inputBase} mx-auto h-8 w-20 text-center"
								value={item.area}
								oninput={(e) =>
									handleItemChange(
										item.id,
										'area',
										parseFloat((e.currentTarget as HTMLInputElement).value) || 0
									)}
							/>
						</td>
						<td class="py-2">
							<input
								type="number"
								class="{inputBase} mx-auto h-8 w-28 text-center"
								value={item.currentRent}
								oninput={(e) =>
									handleItemChange(
										item.id,
										'currentRent',
										parseFloat((e.currentTarget as HTMLInputElement).value) || 0
									)}
							/>
						</td>
						<td class="py-2">
							<input
								type="number"
								class="{inputBase} mx-auto h-8 w-28 text-center"
								value={item.estimatedRent}
								oninput={(e) =>
									handleItemChange(
										item.id,
										'estimatedRent',
										parseFloat((e.currentTarget as HTMLInputElement).value) || 0
									)}
							/>
						</td>
						<td class="py-2 text-center">
							<Checkbox
								checked={item.occupied}
								onchange={(e: Event) =>
									handleItemChange(
										item.id,
										'occupied',
										(e.currentTarget as HTMLInputElement).checked
									)}
							/>
						</td>
						<td class="py-2">
							<Button
								variant="ghost"
								size="icon"
								class="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
								onclick={() => removeRow(item.id)}
							>
								<Trash2 class="h-4 w-4" />
							</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<Button variant="outline" class="mt-4 w-full gap-2 bg-transparent" onclick={addRow}>
		<Plus class="h-4 w-4" />
		行を追加
	</Button>
</Card>
