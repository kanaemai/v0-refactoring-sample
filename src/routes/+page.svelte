<script lang="ts">
	import DashboardHeader from '$lib/components/layout/DashboardHeader.svelte';
	import SummaryCards from '$lib/components/specific/SummaryCards.svelte';
	import PropertyList from '$lib/components/specific/PropertyList.svelte';
	import { mockProperties, type Property } from '$lib/types';

	// 配列管理: $state でプロパティ一覧を保持
	let properties = $state<Property[]>([...mockProperties]);

	// 更新: 配列をイミュータブルに更新してリアクティビティを発火
	function updateProperty(id: string, updates: Partial<Property>) {
		properties = properties.map((p) => (p.id === id ? { ...p, ...updates } : p));
	}

	function getProperty(id: string): Property | undefined {
		return properties.find((p) => p.id === id);
	}
</script>

<div class="min-h-screen bg-background">
	<DashboardHeader />
	<main class="mx-auto max-w-7xl px-6 py-8">
		<SummaryCards {properties} />
		<PropertyList {properties} />
	</main>
</div>
