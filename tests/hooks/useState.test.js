import { beforeAll, describe, expect, it } from "vitest";

import { createElement, useState, render } from "../../lib";

const MockComponentFunction = () => {
	const [state, setState] = useState(1);

	return createElement(
		"div",
		{},
		createElement("div", { id: "outcome" }, "State value: " + state),
		createElement(
			"button",
			{ id: "incrementer", onClick: () => setState(state + 1) },
			"Click me!"
		)
	);
};

describe("Tests for useState hook", () => {
	beforeAll(() => {
		render(createElement(MockComponentFunction), document.body);
	});

	it("should properly show initial value and reflect state changes", () => {
		const outcome = document.querySelector("div#outcome").innerHTML;
		expect(outcome).toBe("State value: 1");

		const button = document.querySelector("button#incrementer");

		button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

		const updatedOutcome = document.querySelector("div#outcome").innerHTML;

		expect(updatedOutcome).toBe("State value: 2");
	});
});
