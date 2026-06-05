<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { resolve } from '$app/paths';
	let showTyphonOptions = false;
	const treepage = resolve(`/treepage`);
</script>

<div class="flex items-end gap-2">
	<Button onclick={() => (showTyphonOptions = true)}>Typhon</Button>
	{#if showTyphonOptions}
		<div class="flex gap-2">
			<Button href="{treepage}?mode=update">Update</Button>

			<Button href="{treepage}?mode=preset">Preset</Button>
		</div>
	{/if}
	<Button onclick={() => (showTyphonOptions = false)}>Nymphes</Button>
	<Button href={treepage}>Other Sysex Device</Button>
</div>
