import { describe, expect, it } from "vitest";

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

describe("Tests for render function", () => {
	it("should render elements correctly to the screen with hooks", () => {
		render(createElement(MockComponentFunction), document.body);

		expect(document.querySelector("div#outcome")).toBeDefined();
		expect(document.querySelector("button#incrementer")).toBeDefined();

		expect(document.querySelector("div#outcome").innerHTML).toBe("1");
	});
});
