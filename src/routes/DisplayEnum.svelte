<script lang="ts" generics="T extends z.ZodEnum">
	import type z from 'zod';
	export let enumSchema: T;
	export let currentValue: z.infer<T>;
	const options = enumSchema.options;
</script>

<div>
	<p>Current value: {currentValue}</p>
	<div>
		<strong>Possible values:</strong>
		<ul>
			{#each options as option (option)}
				<li>{option}</li>
			{/each}
		</ul>
	</div>
</div>
