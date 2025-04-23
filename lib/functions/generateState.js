export default function generateState(initialValue) {
	let currentValue = initialValue;

	function triggerUpdate(newValue) {
		currentValue = newValue;

		// Ask the entire app to re-render from the top (Diffing will be done obviously)
	}

	return [currentValue, triggerUpdate];
}
