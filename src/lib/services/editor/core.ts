import { writable, type Writable } from "svelte/store";
import { mdToHTML } from "./markdown";
let EDITOR_INSTANCE: EditorService;
interface EditorData {
	raw_content: string;
	output: string;
}
interface EditorService {
	subscribe: Writable<EditorData>["subscribe"];
	init(_target: HTMLElement, _content: string): void;
	update(content: string): void;
}

export function createEditor(target: HTMLElement, content = ""): EditorService {
	if (!EDITOR_INSTANCE) {
		EDITOR_INSTANCE = _editor();
		EDITOR_INSTANCE.init(target, content);
	}
	return EDITOR_INSTANCE;
}
export const editorSvc = _editor();
function _editor() {
	let raw_content = "",
		lastContent = "",
		output = "",
		target: HTMLElement = undefined;
	// const inputManager =
	const { subscribe, update } = writable<{ raw_content: string; output: string }>({ raw_content, output });
	return {
		subscribe,
		init(_target: HTMLElement, _content = "") {
			raw_content = _content;
			target = _target;
			target.setAttribute("contenteditable", "plaintext-only");
			target.setAttribute("spellcheck", "false");
			if (target.contentEditable !== "plaintext-only") {
				target.contentEditable = "true";
			}
		},
		update(content: string) {
			update((data) => {
				if (content !== data.raw_content) {
					data.raw_content = content;
				}
				data.output = mdToHTML(data.raw_content);
				console.log(content, data.raw_content, data.output);
				// if (data.output.length !== )
				return data;
			});
		},
	};
}
