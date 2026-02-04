<script lang="ts">
	import { ClipboardList, Bell, User } from 'lucide-svelte';

	interface Props {
		showBackNav?: boolean;
	}

	let { showBackNav = false }: Props = $props();
</script>

<header class="flex items-center justify-between border-b border-border bg-card px-6 py-4">
	<div class="flex items-center gap-3">
		<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
			<ClipboardList class="h-5 w-5 text-primary-foreground" />
		</div>
		<div>
			<h1 class="text-lg font-semibold text-foreground">不動産案件管理</h1>
			<p class="text-sm text-muted-foreground">Property Deal Management System</p>
		</div>
	</div>
	<div class="flex items-center gap-4">
		<button class="relative rounded-full p-2 transition-colors hover:bg-muted" type="button">
			<Bell class="h-5 w-5 text-muted-foreground" />
			<span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500"></span>
		</button>
		<div class="flex items-center gap-2">
			<User class="h-5 w-5 text-muted-foreground" />
			<span class="text-sm font-medium text-foreground">田中 太郎</span>
		</div>
	</div>
</header>
