/**
 * @type {Map<componentFunction, Map<hookNumber, value>}
 */
const stateMap = new Map();

export function isInitialValueSet(componentFunction, hookNumber) {
	if (
		!stateMap.has(componentFunction) ||
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
		return undefined;

	const existingValue = stateMap.get(componentFunction).get(hookNumber);

	return existingValue;
}

export function set(componentFunction, hookNumber, value) {
	if (!stateMap.has(componentFunction))
		stateMap.set(componentFunction, new Map());

	stateMap.get(componentFunction).set(hookNumber, value);
}
