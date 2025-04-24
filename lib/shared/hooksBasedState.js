/**
 * @type {Map<componentFunction, Map<hookNumber, value>}
 */
const hooksBasedState = new Map();

export function isInitialValueSet(componentFunction, hookNumber) {
	if (
		!hooksBasedState.has(componentFunction) ||
		!hooksBasedState.get(componentFunction).has(hookNumber)
	)
		return false;
	return true;
}

export function get(componentFunction, hookNumber) {
	if (
		!hooksBasedState.has(componentFunction) ||
		!hooksBasedState.get(componentFunction).has(hookNumber)
	)
		return undefined;

	const existingValue = hooksBasedState.get(componentFunction).get(hookNumber);

	return existingValue;
}

export function set(componentFunction, hookNumber, value) {
	if (!hooksBasedState.has(componentFunction))
		hooksBasedState.set(componentFunction, new Map());

	hooksBasedState.get(componentFunction).set(hookNumber, value);
}
