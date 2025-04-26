// @ts-check
import renderCycleContext from "./renderCycleContext.js";

import {
	appendToElement,
	convertElementToDOM,
	createTextNode,
} from "../functions/helpers/dom.js";

class RenderCycle {
	/**
	 * @type {RenderCycle}
	 */
	static current;

	/**
	 * @type {typeof renderCycleContext}
	 */
	context;

	constructor() {
		// Start render cycle from scratch
		renderCycleContext.reset();

		this.context = renderCycleContext;

		RenderCycle.current = this;
	}

	render(element, domNodeContainer) {
		const parentDOMNodeContainer = domNodeContainer;

		let domNodeCreated;

		if (typeof element === "string") {
			domNodeCreated = createTextNode(element);
		} else if (typeof element.type === "string") {
			domNodeCreated = convertElementToDOM(element);

			for (let child of element.props.children) {
				this.render(child, domNodeCreated);
			}
		} else {
			// Complex functional component
			// Initialize hooks and other evaluation
			this.context.currentComponent = element.type;

			const returnedFromComponent = element.type(element.props);

			if (returnedFromComponent instanceof Node)
				domNodeCreated = returnedFromComponent;
			else this.render(returnedFromComponent, parentDOMNodeContainer);
		}

		if (domNodeCreated && domNodeCreated instanceof Node)
			appendToElement(parentDOMNodeContainer, domNodeCreated);
	}
}

export default RenderCycle;
