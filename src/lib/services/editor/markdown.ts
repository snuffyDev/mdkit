import { Remarkable } from "remarkable";
import hljs from "highlight.js";
const md = new Remarkable("full", {
	langPrefix: "language-",
	highlight: (input: string, lang = "") => {
		try {
			return hljs.highlightAuto(input).value;
		} catch (err) {}
		return "";
	},
	typographer: true,
	html: true,
	breaks: true,
});

export function mdToHTML(code = "") {
	return md.render(code);
}
