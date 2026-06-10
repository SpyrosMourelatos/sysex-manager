<script lang="ts">
	import { z } from 'zod';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import DisplayEnum from './../DisplayEnum.svelte';
	const DriveMode = z.enum(['Off', 'Low', 'Mid', 'High']);

	const enumWrapper = z.object({
		enumValue: DriveMode
	});

	type enumWrapperType = z.infer<typeof enumWrapper>;

	let savedValue: enumWrapperType = { enumValue: 'Off' };
	const { form, validateForm } = superForm(
		{
			enumValue: 'Off'
		},
		{
			validators: zod4(enumWrapper)
		}
	);

	async function save() {
		const result = await validateForm();

		if (result.valid) {
			savedValue = { ...$form } as enumWrapperType;
		}
	}
</script>

Which Value you want
<select bind:value={$form.enumValue} on:change={save}>
	{#each DriveMode.options as option (option)}
		<option value={option}>{option}</option>
	{/each}
</select>
<DisplayEnum enumSchema={DriveMode} currentValue={savedValue.enumValue} />
