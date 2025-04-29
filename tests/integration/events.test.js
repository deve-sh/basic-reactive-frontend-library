import { beforeAll, describe, expect, it } from "vitest";

import { createElement, render } from "../../lib";

let mockInvocationCounter = 0;

const MockComponentFunction = () => {
	return createElement(
		"div",
		{ onClick: () => mockInvocationCounter++ },
		createElement(
			"button",
			{ onClick: () => mockInvocationCounter++ },
			"Click me!"
		)
	);
};

describe("Tests for event delegation", () => {
	beforeAll(() => {
		render(createElement(MockComponentFunction), document.body);
	});

	it("should run and execute all event listeners in the chain", () => {
        expect(mockInvocationCounter).toBe(0);

		const button = document.querySelector("button");
		button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

		expect(mockInvocationCounter).toBe(2);
	});
});
