<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { ClipboardList, LayoutDashboard, Calculator, FileDown, Save } from 'lucide-svelte';

	import Button from '$lib/components/shared/Button.svelte';
	import AssessmentForm from '$lib/components/specific/AssessmentForm.svelte';
	import KpiCards, { type CalculatedValues } from '$lib/components/specific/KpiCards.svelte';
	import IncomeBreakdown from '$lib/components/specific/IncomeBreakdown.svelte';
	import RentRoll from '$lib/components/specific/RentRoll.svelte';
	import type { Property, RentRollItem } from '$lib/types';
	import { mockProperties } from '$lib/utils/mockProperties';

	const id = $derived($page.params.id);

	// フォームデータ（査定対象）: $state
	let formData = $state<Property | null>(null);

	$effect(() => {
		const property = mockProperties.find((p) => p.id === id);
		formData = property ? { ...property } : null;
	});

	function handleUpdate(updates: Partial<Property>) {
		if (!formData) return;
		formData = { ...formData, ...updates };
	}

	function handleRentRollUpdate(items: RentRollItem[]) {
		if (!formData) return;
		formData = { ...formData, rentRoll: items };
	}

	function handleSave() {
		// 本来はバックエンドに保存。ここではダッシュボードへ戻す。
		goto(resolve('/'));
	}

	// KPI計算: $derived（配列/計算ロジックを runes に移植）
	const calculatedValues = $derived.by((): CalculatedValues => {
		if (!formData) return { grossProfit: 0, profitRate: 0, capRate: 0, depreciationYears: 23 };

		const { purchasePrice, renovationCost, estimatedSalePrice, rentRoll, completionDate } =
			formData;

		const brokerageFee = Math.floor(estimatedSalePrice * 0.03 + 60000);
		const registrationTax = Math.floor(purchasePrice * 0.02);
		const acquisitionTax = Math.floor(purchasePrice * 0.04);
		const stampDuty = 30000;
		const otherCosts = Math.floor(purchasePrice * 0.015);

		const totalCost =
			purchasePrice +
			renovationCost +
			brokerageFee +
			registrationTax +
			acquisitionTax +
			stampDuty +
			otherCosts;

		const grossProfit = estimatedSalePrice - totalCost;
		const profitRate = totalCost > 0 ? (grossProfit / totalCost) * 100 : 0;

		const annualRent = rentRoll.reduce(
			(sum, item) => sum + (item.occupied ? item.currentRent * 12 : 0),
			0
		);
		const capRate = purchasePrice > 0 ? (annualRent / purchasePrice) * 100 : 0;

		const completionYear = parseInt(completionDate.split('/')[0], 10) || 2000;
		const currentYear = new Date().getFullYear();
		const buildingAge = currentYear - completionYear;
		const rcLifespan = 47;
		const remainingYears = Math.max(0, rcLifespan - buildingAge);
		const depreciationYears =
			remainingYears > 0 ? remainingYears : Math.floor((rcLifespan - buildingAge) * 0.2);

		return {
			grossProfit,
			profitRate,
			capRate,
			depreciationYears: Math.max(1, depreciationYears)
		};
	});
</script>

{#if !formData}
	<div class="flex min-h-screen items-center justify-center bg-background">
		<p class="text-muted-foreground">読み込み中...</p>
	</div>
{:else}
	<div class="min-h-screen bg-background">
		<header class="flex items-center justify-between border-b border-border bg-card px-6 py-3">
			<div class="flex items-center gap-3">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
					<ClipboardList class="h-4 w-4 text-primary-foreground" />
				</div>
				<span class="font-semibold text-foreground">EstateProfit MVP</span>
			</div>

			<div class="flex items-center gap-4">
				<Button
					variant="ghost"
					class="gap-2 text-muted-foreground"
					onclick={() => goto(resolve('/'))}
				>
					<LayoutDashboard class="h-4 w-4" />
					Dashboard
				</Button>
				<Button variant="ghost" class="gap-2 text-foreground">
					<Calculator class="h-4 w-4" />
					Quick Estimate
				</Button>
			</div>

			<div class="flex items-center gap-3">
				<Button variant="outline" class="gap-2 bg-transparent">
					<FileDown class="h-4 w-4" />
					PDF出力
				</Button>
				<Button class="gap-2 bg-blue-600 text-white hover:bg-blue-700" onclick={handleSave}>
					<Save class="h-4 w-4" />
					保存
				</Button>
			</div>
		</header>

		<main class="mx-auto max-w-7xl px-6 py-6">
			<h1 class="mb-6 text-2xl font-bold text-foreground">クイック査定</h1>

			<div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<AssessmentForm {formData} onUpdate={handleUpdate} />
				</div>

				<div class="lg:col-span-8">
					<KpiCards values={calculatedValues} />
					<IncomeBreakdown
						salePrice={formData.estimatedSalePrice}
						purchasePrice={formData.purchasePrice}
						renovationCost={formData.renovationCost}
						buildingRatio={formData.buildingRatio}
					/>
				</div>
			</div>

			<div class="mt-6">
				<RentRoll items={formData.rentRoll} onUpdate={handleRentRollUpdate} />
			</div>
		</main>
	</div>
{/if}
