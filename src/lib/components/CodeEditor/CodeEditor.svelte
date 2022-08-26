<script lang="ts">
	import { browser } from '$app/env';
	import { editorSvc } from '$lib/services/editor/core';

	import throttle from '$lib/utils/throttle';

	import { createEventDispatcher, onMount } from 'svelte';

	export let content = '';

	let contentElement: HTMLElement = undefined;

	type Events = {
		change: { content: string };
		mounted: { target: HTMLElement };
	};
	const onChange = (event: Event & { target: HTMLElement & EventTarget }) => {
		content = event.target.textContent!;
		dispatch('change', { content });
	};
	// $: browser && contentElement && dispatch('mounted', { target: contentElement });

	onMount(() => {
		editorSvc.init(contentElement, '');
	});
	const dispatch = createEventDispatcher<{
		change: { content: string };
		mounted: { target: HTMLElement };
	}>();
</script>

<div class="editor">
	<pre
		class="editor-content"
		on:keyup={(event) => {
			onChange(event);
		}}
		bind:this={contentElement}>{content}</pre>
</div>

<style src="./index.scss" lang="scss">
</style>
