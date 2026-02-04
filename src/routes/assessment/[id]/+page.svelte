<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const id = $derived($page.params.id);
</script>

<div class="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
	<p class="text-muted-foreground">査定ページ (ID: {id})</p>
	<a href="/" class="text-primary underline">ダッシュボードに戻る</a>
</div>
