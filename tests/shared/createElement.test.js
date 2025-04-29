import { describe, expect, it } from "vitest";

import { createElement } from "../../lib";

describe("Tests for the core createElement function", () => {
	it("should create a basic object for any component passed to it", () => {
		expect(createElement("div", {})).toMatchObject({
			type: "div",
			props: { children: [] },
		});

		const ComponentFunction = () => null;
		const eventListener = () => console.log("Hi there");

		expect(
			createElement(
				ComponentFunction,
				{ prop: "propValue" },
				createElement("div", { onClick: eventListener })
			)
		).toMatchObject({
			type: ComponentFunction,
			props: {
				prop: "propValue",
				children: [
					{
						type: "div",
						props: { onClick: eventListener, children: [] },
					},
				],
			},
		});
	});
});
