<script lang="ts">
	import { ClipboardList, Bell, User } from 'lucide-svelte';

	interface Props {
		showBackNav?: boolean;
	}

	let { showBackNav = false }: Props = $props();
</script>

<header class="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
	<div class="flex items-center gap-3">
		<div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
			<ClipboardList class="w-5 h-5 text-primary-foreground" />
		</div>
		<div>
			<h1 class="text-lg font-semibold text-foreground">不動産案件管理</h1>
			<p class="text-sm text-muted-foreground">Property Deal Management System</p>
		</div>
	</div>
	<div class="flex items-center gap-4">
		<button class="relative p-2 rounded-full hover:bg-muted transition-colors" type="button">
			<Bell class="w-5 h-5 text-muted-foreground" />
			<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
		</button>
		<div class="flex items-center gap-2">
			<User class="w-5 h-5 text-muted-foreground" />
			<span class="text-sm font-medium text-foreground">田中 太郎</span>
		</div>
	</div>
</header>
