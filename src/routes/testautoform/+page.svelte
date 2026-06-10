<script lang="ts">
	import { z } from 'zod';
	import SuperformEnum from './../SuperformEnum.svelte';
	import DisplayEnum from './../DisplayEnum.svelte';
	import { DriveMode } from '$lib/schema';
  let val: z.infer<typeof DriveMode> = "Off" 

</script>
Which value do you want?

<DisplayEnum enumSchema={DriveMode} currentValue={val} />
<SuperformEnum enumZodSchema={DriveMode} currentValue={val}/>
