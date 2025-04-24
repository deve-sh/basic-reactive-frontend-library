function appendToElement(element, toAppend) {
	if (typeof toAppend === "string") {
		element.appendChild(document.createTextNode(toAppend));
	} else if (Array.isArray(toAppend)) {
		toAppend.forEach((childInsideChild) =>
			appendToElement(element, childInsideChild)
		);
	} else {
		element.appendChild(toAppend);
	}
}

export default function createElement(tagName, props, ...children) {
	if (typeof tagName === "string") {
		// DOM Element
		const elementCreated = document.createElement(tagName);

		const { style, onClick, ...otherAttributes } = props || {};

		const normalizedStyle = Object.keys(style || {})
			.map((styleKey) => `${styleKey}:${style[styleKey]}`)
			.join(";");

		if (onClick) elementCreated.addEventListener("click", onClick);
		if (normalizedStyle) elementCreated.style = normalizedStyle;

		for (let attr in otherAttributes)
			if (attr.toLowerCase() === attr) elementCreated[attr] = otherAttributes[attr];

		for (let child of children) appendToElement(elementCreated, child);

		return elementCreated;
	}

	// TODO: Rendering of complex components (I.E: Composed components)
}

/*
createElement(
	"h1",
	{ title: "Hi there" },
	"Some heading text",
	createElement(
		"div",
		{ style: { "font-weight": "bold" } },
		"Some div text too"
	)
);

->

<h1 title="Hi there">
	Some heading text
	<div style="font-weight: bold">Some div text too</div>
</h1>
*/
