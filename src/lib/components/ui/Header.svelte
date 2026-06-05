<script lang="ts">
	import { Input } from '$lib/components/ui/input/index';
	import { Slider } from '$lib/components/ui/slider/index';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import * as Select from '$lib/components/ui/select/index';
	import { Circle, Settings } from '$lib';
	import { Label } from '$lib/components/ui/label';
	import { toggleMode } from 'mode-watcher';
	import { onMount } from 'svelte';
	let selectedInput: string = $state('');
	let selectedOutput: string = $state('');
	let pause: number = $state(0);
	let midiInputs: MIDIInput[] = $state([]);
	let midiOutputs: MIDIOutput[] = $state([]);
	let dark: boolean = $state(false);

	const inTrigger = $derived(
		midiInputs.find((d) => d.id === selectedInput)?.name ?? 'Choose MIDI in device'
	);

	const outTrigger = $derived(
		midiOutputs.find((d) => d.id === selectedOutput)?.name ?? 'Choose MIDI out device'
	);

	onMount(() => {
		if (
			localStorage.theme ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			dark = true;
		}

		navigator
			.requestMIDIAccess({ sysex: true })
			.then(handleMIDI)
			.catch((error: unknown) => {
				console.error(error);
			});
	});

	function handleMIDI(access: MIDIAccess) {
		midiInputs = Array.from(access.inputs.values());
		midiOutputs = Array.from(access.outputs.values());

		access.onstatechange = () => {
			midiInputs = Array.from(access.inputs.values());
			midiOutputs = Array.from(access.outputs.values());
		};
	}
</script>

<div class="flex w-full items-center justify-between p-8">
	<h1 class="text-2xl">Sysex Manager</h1>
	<div class="flex items-center gap-4">
		<Select.Root type="single" bind:value={selectedOutput} name="MIDI out">
			<Select.Trigger>
				{outTrigger}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Choose MIDI out device</Select.Label>
					{#each midiOutputs as device (device.id)}
						<Select.Item value={device.id} label={device.name ?? ''}>{device.name}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
		<Select.Root type="single" bind:value={selectedInput} name="MIDI in">
			<Select.Trigger>
				{inTrigger}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Choose MIDI in device</Select.Label>
					{#each midiInputs as device (device.id)}
						<Select.Item value={device.id} label={device.name ?? ''}>{device.name}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
		<Dialog.Root>
			<Dialog.Trigger><Settings /></Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>Settings</Dialog.Header>
				<div class="flex justify-between">
					<Label>Pause between messages</Label>
					<Input class="w-min text-right" type="number" bind:value={pause} />
				</div>
				<Slider type="single" bind:value={pause} max={5000} step={1} />
			</Dialog.Content>
		</Dialog.Root>

		<button class="size-6 px-0" onclick={toggleMode}>
			<Circle class={dark ? 'hover:fill-background' : 'fill-background hover:fill-foreground'} />
		</button>
	</div>
</div>
