import type { Maybe } from "$lib/types/util";

export class Section {
	element: Maybe<HTMLElement>;
	constructor(public text = "") {}
	setElement(element: HTMLElement) {
		this.element = element;
	}
}
