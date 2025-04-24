/**
 * @type {Map<componentFunction, Map<hookNumber, value>}
 */
const stateMap = new Map();

export function isInitialValueSet(componentFunction, hookNumber) {
	if (
		!stateMap.has(componentFunction) &&
		!stateMap.get(componentFunction).has(hookNumber)
	)
		return false;
	return true;
}

export function get(componentFunction, hookNumber) {
	if (
		!stateMap.has(componentFunction) ||
		!stateMap.get(componentFunction).has(hookNumber)
	)
		return null;

	const existingValue = stateMap.get(componentFunction).get(hookNumber);

	return existingValue;
}

export function set(componentFunction, hookNumber, value) {
	if (!stateMap.has(componentFunction))
		stateMap.set(componentFunction, new Map());

	const existingValue = get(componentFunction, hookNumber);

	stateMap.get(componentFunction).set(hookNumber, value);

	if (isReactiveHook && existingValue !== value) {
		// Trigger re-render as value has been changed for the hook - useState values
	}
}
