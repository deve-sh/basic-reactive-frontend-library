import { beforeAll, describe, expect, it } from "vitest";

import { createElement, useMemo, useState, render } from "../../lib";

const MockComponentFunction = () => {
	const [state, setState] = useState(1);

	const toRender = useMemo(() => {
		return state ** 2;
	}, [state]);

	return createElement(
		"div",
		{},
		createElement("div", { id: "outcome" }, toRender),
		createElement(
			"button",
			{ id: "incrementer", onClick: () => setState(state + 1) },
			"Click me!"
		)
	);
};

describe("Tests for useMemo hook", () => {
	beforeAll(() => {
		render(createElement(MockComponentFunction), document.body);
	});

	it("should run and store the memoized value in internal state for the component", () => {
		const outcome = document.querySelector("div#outcome").innerHTML;
		expect(outcome).toBe("1");
	});

	it("should recompute the memoized value when dependencies change", () => {
		const button = document.querySelector("button#incrementer");

		button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

		const outcome = document.querySelector("div#outcome").innerHTML;

		expect(outcome).toBe("4");
	});
});
