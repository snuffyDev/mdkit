import { toPromise } from "$lib/utils/promise";
import Prism from "prismjs";
let highlighter;

// export function createHighlighter(target: HTMLElement) {
//     if (!highlighter) {
//         highlighter = Prism.highlightElement.bind(toPromise,target,true,)
//     }
// }
export function highlightDocument(target: HTMLElement, text: string) {
	Prism.highlightElement(target, false);
}
