<script lang="ts">
	import DashboardHeader from '$lib/components/layout/DashboardHeader.svelte';
	import SummaryCards from '$lib/components/specific/SummaryCards.svelte';
	import PropertyList from '$lib/components/specific/PropertyList.svelte';
	import type { Property } from '$lib/types';
	import { mockProperties } from '$lib/utils/mockProperties';

	// 配列管理: $state でプロパティ一覧を保持
	let properties = $state<Property[]>([...mockProperties]);
</script>

<div class="min-h-screen bg-background">
	<DashboardHeader />
	<main class="mx-auto max-w-7xl px-6 py-8">
		<SummaryCards {properties} />
		<PropertyList {properties} />
	</main>
</div>
