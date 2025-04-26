export function appendToElement(element, toAppend) {
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

export function createTextNode(element) {
	const node = document.createTextNode(element);
	return node;
}

export function convertElementToDOM(element) {
	// DOM Element
	const elementCreated = document.createElement(element.type);

	const { style, onClick, children, ...otherAttributes } = element.props || {};

	const normalizedStyle = Object.keys(style || {})
		.map((styleKey) => `${styleKey}:${style[styleKey]}`)
		.join(";");

	if (normalizedStyle) elementCreated.style = normalizedStyle;

	for (let attr in otherAttributes)
		if (attr.toLowerCase() === attr)
			elementCreated[attr] = otherAttributes[attr];

	elementCreated.__internalProps = element.props;

	return elementCreated;
}

/*
convertElementToDOM(
    createElement(
        "h1",
        { title: "Hi there" },
        "Some heading text",
        createElement(
            "div",
            { style: { "font-weight": "bold" } },
            "Some div text too"
        )
    )
);

->

<h1 title="Hi there">
	Some heading text
	<div style="font-weight: bold">Some div text too</div>
</h1>
*/
