import { expect, describe, test } from "vitest";

import useState from "../../lib/functions/hooks/useState";
import * as hooksBasedState from "../../lib/shared/hooksBasedState";

const SimpleComponent = () => {
	const [name] = useState('Initial Value');

	return "Hi there: " + name;
};

describe("Hooks based state utilities tests", () => {
	test("function: hooksBasedState.isInitialValueSet and hooksBasedState.set", () => {
		expect(hooksBasedState.isInitialValueSet(SimpleComponent, 0)).toBe(false);

		hooksBasedState.set(SimpleComponent, 0, "Initial Value");

		expect(hooksBasedState.isInitialValueSet(SimpleComponent, 0)).toBe(true);
	});

	test("function: hooksBasedState.set and hooksBasedState.get", () => {
		hooksBasedState.set(SimpleComponent, 0, "Next Value");

		expect(hooksBasedState.get(SimpleComponent, 0)).toBe("Next Value");
	});
});
