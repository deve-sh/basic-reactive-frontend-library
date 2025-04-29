import { beforeAll, describe, expect, it } from "vitest";

import { createElement, useState, useEffect, render } from "../../lib";

let mockUseEffectCallbackInvocationCounter = 0;

const MockComponentFunction = () => {
	const [state, setState] = useState(0);

	useEffect(() => {
		mockUseEffectCallbackInvocationCounter++;
	}, [state]);

	return createElement(
		"button",
		{ id: "incrementer", onClick: () => setState(state + 1) },
		"Click me!"
	);
};

describe("Tests for useEffect hook", () => {
	beforeAll(() => {
		render(createElement(MockComponentFunction), document.body);
	});

	it("should run the effect on mount", () => {
		// Since useEffect runs post the render cycle in a request animation frame, we need to wait for it to run
		// Thus offloading this run to a setTimeout to execute post the useEffect invocation
		setTimeout(
			() => expect(mockUseEffectCallbackInvocationCounter).toBe(1),
			50
		);
	});

	it("should run the effect when dependencies change", () => {
		const button = document.querySelector("button#incrementer");

		button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

		setTimeout(
			() => expect(mockUseEffectCallbackInvocationCounter).toBe(2),
			50
		);
	});
});
