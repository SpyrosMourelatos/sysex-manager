<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/ui/Header.svelte';
</script>

<ModeWatcher />
<Header />
<slot />
