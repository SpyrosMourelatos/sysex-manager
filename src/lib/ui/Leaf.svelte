<script lang="ts">
	import z from 'zod/v4';
	import { type $ZodIssue } from 'zod/v4/core';
	import * as Select from '../components/ui/select/index';
	import { Input } from '../components/ui/input/index';
	import { Checkbox } from '../components/ui/checkbox/index';
	import type { FormValue } from '../types';
	let {
		schema,
		value,
		onChange,
		validationErrors,
		path
	}: {
		schema: z.ZodType;
		value: FormValue;
		onChange: (arg0: FormValue) => void;
		validationErrors: $ZodIssue[];
		path: string[];
	} = $props();

	//onChange(value);

	function getOptions(schema: z.ZodType): string[] {
		if (schema instanceof z.ZodEnum) {
			return schema.options.map((v) => v.toString());
		}
		if (schema instanceof z.ZodUnion) {
			return schema.options.map((option) => {
				if (option instanceof z.ZodLiteral) {
					return option.value ? option.value.toString() : '';
				}
				return JSON.stringify(option);
			});
		}
		return [];
	}

	function getErrors(validationErrors: $ZodIssue[], path: string[]) {
		return validationErrors.filter((error) => {
			const errorPath = error.path.join('');
			const fieldPath = path.join('');
			return errorPath === fieldPath;
		});
	}

	//derive is just to fake the logic that options is dynamic, even though it stays the same from the beggining to the end
	const options = $derived(getOptions(schema));

	const errorMessages = $derived(getErrors(validationErrors, path));
</script>

<div>
	{#if schema instanceof z.ZodString || schema instanceof z.ZodOptional}
		<Input
			type="text"
			bind:value={value as string}
			oninput={() => {
				onChange(value);
			}}
		/>
	{:else if schema instanceof z.ZodNumber}
		<Input
			type="number"
			bind:value
			oninput={() => {
				onChange(value);
			}}
			step="0.01"
		/>
	{:else if schema instanceof z.ZodBoolean}
		<Checkbox
			bind:checked={value as boolean | undefined}
			onCheckedChange={() => {
				onChange(value);
			}}
		/>
	{:else if schema instanceof z.ZodEnum || schema._zod.def instanceof z.ZodUnion}
		<Select.Root
			type="single"
			bind:value={value as string | undefined}
			onValueChange={() => {
				onChange(value);
			}}
		>
			<Select.Trigger>{value}</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each options as option, i (i)}
						<Select.Item value={option} label={option}>
							{option}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	{:else}
		<div>Unsupported type: {schema._zod.def.type}</div>
	{/if}

	{#if errorMessages.length > 0}
		{#each errorMessages as message, i (i)}
			<span class="text-destructive text-xs">{message.message}</span>
		{/each}
	{/if}
</div>
