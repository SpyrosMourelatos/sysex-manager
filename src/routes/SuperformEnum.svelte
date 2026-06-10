<script lang="ts" generics="T extends z.ZodEnum">
	import { z } from 'zod';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import DisplayEnum from './DisplayEnum.svelte';

	export let enumSchema: T;
	export let currentValue: z.infer<T>;

	const options = enumSchema.options;
	const enumWrapper = z.object({
		enumValue: enumSchema
	});

	// type enumWrapperType = z.infer<typeof enumWrapper>;

	const { form, validateForm } = superForm(
		{
			enumValue: currentValue
		},
		{
			validators: zod4(enumWrapper)
		}
	);

	async function save() {
		const result = await validateForm();

		if (result.valid) {
			currentValue = result.data.enumValue as z.infer<T>;
		}
	}
</script>

<select bind:value={$form.enumValue} on:change={save}>
	{#each options as option (option)}
		<option value={option}>{option}</option>
	{/each}
</select>
<DisplayEnum {enumSchema} {currentValue} />
