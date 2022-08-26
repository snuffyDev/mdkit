<script lang="ts">
	import { createEditor, editorSvc } from '$lib/services/editor/core';

	import CodeEditor from '../CodeEditor';
	import Preview from '../Preview';
	// let content = '';
	function handleInput(event: Event) {
		// if ()
		editorSvc.update($editorSvc.raw_content);
	}
</script>

<div class="editor-container">
	<div class="editor panel">
		<CodeEditor
			on:mounted={({ detail }) => {
				editorSvc.init(detail.target, '');
			}}
			on:change={({ detail }) => {
				editorSvc.update(detail.content);
			}}
		/>
	</div>
	<div class="preview panel">
		<Preview html={$editorSvc.output} />
	</div>
</div>

<style src="./index.scss" lang="scss">
</style>
