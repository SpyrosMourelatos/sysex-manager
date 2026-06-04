<script lang="ts">
	import TreeNode from './TreeNode.svelte';
	import Leaf from './Leaf.svelte';
	import { Button } from '../components/ui/button/index';
	import { Label } from '../components/ui/label/index';
	import { z } from 'zod/v4';
	import { type $ZodIssue } from 'zod/v4/core';
	import ChevronDown from '$lib/icons/ChevronDown.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	import type { FormValue } from '../types';

	type schemaType = z.ZodType;
	type Props = {
		schema: schemaType;
		value: FormValue;
		path: string[];
		updateData: (path: string[], value: FormValue) => void;
		validationErrors: $ZodIssue[];
	};

	const { schema, value, path, updateData, validationErrors }: Props = $props();
	let expanded = $state(false);

	$effect(() => {
		if (path.length < 1) {
			expanded = true;
		}
	});

	function toggle() {
		expanded = !expanded;
	}

	function hasError(): boolean {
		let bool = false;
		validationErrors.forEach((err) => {
			const errorPath = err.path.join('');
			const nodePath = path.join('');
			if (errorPath.includes(nodePath)) bool = true;
		});
		return bool;
	}

	const isLeaf = $derived(!['object', 'array'].includes(schema._zod.def.type));
	//const isDefault = ['default'].includes(schema._zod.def.type);
	// lets see what happens if we remove default
	const pathkey = $derived(path[path.length - 1] || 'Preset');
</script>

{#if isLeaf}
	<div class="grid grid-cols-[200px_auto] gap-2 p-2 ml-{(path.length - 1) * 10 + 3}">
		<Label>{pathkey}</Label>
		<Leaf
			{schema}
			{value}
			onChange={(newValue) => {
				updateData(path, newValue);
			}}
			{validationErrors}
			{path}
		/>
	</div>
{:else}
	{#if path.length > 0}
		<div
			class="flex gap-2 p-2 ml-{(path.length - 1) * 10} items-center {hasError()
				? 'text-destructive'
				: 'lol'}"
		>
			<Button onclick={toggle} variant="ghost" class={hasError() ? 'text-destructive' : 'lol'}>
				{#if expanded}
					<ChevronDown />
				{:else}
					<ChevronRight />
				{/if}
			</Button>{pathkey}
		</div>
	{/if}

	{#if expanded}
		{#if schema instanceof z.ZodObject}
			{#each Object.entries(schema._zod.def.shape) as [key, child] (key)}
				{@const obj = value as Record<string, FormValue> | undefined}
				<TreeNode
					schema={child}
					value={obj?.[key]}
					path={[...path, key]}
					{updateData}
					{validationErrors}
				/>
			{/each}
		{:else if schema instanceof z.ZodArray}
			{#if value && Array.isArray(value)}
				{#each value as item, index (index)}
					{@const elementSchema = schema.element as z.ZodTypeAny}
					<TreeNode
						schema={elementSchema}
						value={item}
						path={[...path, index.toString()]}
						{updateData}
						{validationErrors}
					/>
				{/each}
			{/if}
		{/if}
	{/if}
{/if}
