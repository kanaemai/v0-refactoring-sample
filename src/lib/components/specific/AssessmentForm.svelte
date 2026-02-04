<script lang="ts">
	import { Building2, Settings2 } from 'lucide-svelte';
	import Card from '$lib/components/shared/Card.svelte';
	import Label from '$lib/components/shared/Label.svelte';
	import Select from '$lib/components/shared/Select.svelte';
	import type { Property } from '$lib/types';

	interface Props {
		formData: Property;
		onUpdate: (updates: Partial<Property>) => void;
	}

	let { formData, onUpdate }: Props = $props();

	const inputBase =
		'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive';

	const structureOptions = [
		{ value: 'RC', label: 'RC' },
		{ value: 'SRC', label: 'SRC' },
		{ value: 'S', label: 'S造' },
		{ value: 'W', label: '木造' }
	];

	const calcMethodOptions = [
		{ value: '指定配分 (Manual)', label: '指定配分 (Manual)' },
		{ value: '固定資産税評価額', label: '固定資産税評価額' },
		{ value: '時価按分', label: '時価按分' }
	];

	function ymdFromSlash(date: string) {
		return date.split('/').join('-');
	}
	function slashFromYmd(date: string) {
		return date.split('-').join('/');
	}
</script>

<div class="space-y-4">
	<Card class="border border-border p-5">
		<div class="mb-4 flex items-center gap-2">
			<Building2 class="h-4 w-4 text-muted-foreground" />
			<h3 class="font-semibold text-foreground">基本情報</h3>
		</div>

		<div class="space-y-4">
			<div>
				<Label for="name" class="text-sm text-muted-foreground">物件名</Label>
				<input
					id="name"
					class="{inputBase} mt-1"
					value={formData.name}
					oninput={(e) => onUpdate({ name: (e.currentTarget as HTMLInputElement).value })}
				/>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<Label for="structure" class="text-sm text-muted-foreground">構造</Label>
					<Select
						id="structure"
						class="mt-1 w-full"
						options={structureOptions}
						value={formData.structure}
						onchange={(e: Event) =>
							onUpdate({ structure: (e.currentTarget as HTMLSelectElement).value })}
					/>
				</div>
				<div>
					<Label for="completionDate" class="text-sm text-muted-foreground">竣工日</Label>
					<input
						id="completionDate"
						type="date"
						class="{inputBase} mt-1"
						value={ymdFromSlash(formData.completionDate)}
						oninput={(e) =>
							onUpdate({
								completionDate: slashFromYmd((e.currentTarget as HTMLInputElement).value)
							})}
					/>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<Label for="landArea" class="text-sm text-muted-foreground">土地面積(㎡)</Label>
					<div class="relative mt-1">
						<input
							id="landArea"
							type="number"
							step="0.1"
							class="{inputBase} pr-8"
							value={formData.landArea}
							oninput={(e) =>
								onUpdate({
									landArea: parseFloat((e.currentTarget as HTMLInputElement).value) || 0
								})}
						/>
						<span class="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground"
							>㎡</span
						>
					</div>
				</div>
				<div>
					<Label for="buildingArea" class="text-sm text-muted-foreground">建物面積(㎡)</Label>
					<div class="relative mt-1">
						<input
							id="buildingArea"
							type="number"
							step="0.1"
							class="{inputBase} pr-8"
							value={formData.buildingArea}
							oninput={(e) =>
								onUpdate({
									buildingArea: parseFloat((e.currentTarget as HTMLInputElement).value) || 0
								})}
						/>
						<span class="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground"
							>㎡</span
						>
					</div>
				</div>
			</div>
		</div>
	</Card>

	<Card class="border border-border p-5">
		<div class="mb-4 flex items-center gap-2">
			<Settings2 class="h-4 w-4 text-muted-foreground" />
			<h3 class="font-semibold text-foreground">金額設定</h3>
		</div>

		<div class="space-y-4">
			<div>
				<Label for="purchasePrice" class="text-sm text-muted-foreground">仕入価格(税込)</Label>
				<div class="relative mt-1">
					<input
						id="purchasePrice"
						type="number"
						class="{inputBase} pr-8"
						value={formData.purchasePrice}
						oninput={(e) =>
							onUpdate({
								purchasePrice: parseFloat((e.currentTarget as HTMLInputElement).value) || 0
							})}
					/>
					<span class="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground"
						>円</span
					>
				</div>
			</div>

			<div>
				<Label for="renovationCost" class="text-sm text-muted-foreground">改修費用(税込)</Label>
				<div class="relative mt-1">
					<input
						id="renovationCost"
						type="number"
						class="{inputBase} pr-8"
						value={formData.renovationCost}
						oninput={(e) =>
							onUpdate({
								renovationCost: parseFloat((e.currentTarget as HTMLInputElement).value) || 0
							})}
					/>
					<span class="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground"
						>円</span
					>
				</div>
			</div>

			<div>
				<Label for="salePrice" class="text-sm text-muted-foreground">想定売価(税込)</Label>
				<div class="relative mt-1">
					<input
						id="salePrice"
						type="number"
						class="{inputBase} pr-8"
						value={formData.estimatedSalePrice}
						oninput={(e) =>
							onUpdate({
								estimatedSalePrice: parseFloat((e.currentTarget as HTMLInputElement).value) || 0
							})}
					/>
					<span class="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground"
						>円</span
					>
				</div>
			</div>

			<div>
				<Label for="calcMethod" class="text-sm text-muted-foreground">按分方式</Label>
				<Select
					id="calcMethod"
					class="mt-1 w-full"
					options={calcMethodOptions}
					value={formData.calculationMethod}
					onchange={(e: Event) =>
						onUpdate({ calculationMethod: (e.currentTarget as HTMLSelectElement).value })}
				/>
			</div>

			<div class="flex items-center gap-4">
				<Label for="buildingRatio" class="text-sm whitespace-nowrap text-muted-foreground"
					>建物比率:</Label
				>
				<input
					id="buildingRatio"
					type="number"
					step="0.01"
					min="0"
					max="1"
					class="{inputBase} w-24"
					value={formData.buildingRatio}
					oninput={(e) =>
						onUpdate({
							buildingRatio: parseFloat((e.currentTarget as HTMLInputElement).value) || 0
						})}
				/>
			</div>
		</div>
	</Card>
</div>
