<script lang="ts" generics="T extends z.ZodEnum">
	import { z } from 'zod';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';

	export let enumZodSchema: T;
  type enumZodType = z.infer<T>
	export let currentValue: enumZodType;

	const options = enumZodSchema.options;
  // This wrapper is mandatory for zod
	const enumWrapper = z.object({ enumValue: enumZodSchema });

	const { form, validate } = superForm(
		{ enumValue: currentValue },
		{ validators: zod4(enumWrapper) }
	);
  $: currentValue = $form.enumValue;
</script>

<select
	bind:value={$form.enumValue}
>
	{#each options as option (option)}
		<option value={option}>{option}</option>
	{/each}
</select>
