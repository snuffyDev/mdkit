export function clickOutside(node: HTMLElement) {
	return {
		destroy: () => {
			console.log("Change me!");
		}
	};
}
