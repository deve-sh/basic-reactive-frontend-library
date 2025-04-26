import RenderCycle from "./renderCycle";

import mountEventDelegationListeners from "../functions/helpers/events";

export default function render(evaluatedComponent, domNodeContainer) {
	if (!domNodeContainer) throw new Error("DOM Element not provided");

	if (!evaluatedComponent || !(evaluatedComponent instanceof Node))
		throw new Error("Component not provided");

	const renderCycle = new RenderCycle();

	// For events such as `onClick`, `onChange` etc.
	// Capture all events at the root level and then simply delegate it to the indivially rendered component node
	// via event bubbling
	mountEventDelegationListeners(domNodeContainer);

	renderCycle.render(evaluatedComponent, domNodeContainer);
}

// Usage: render(<App />, document.querySelector('#root'))
// <App /> will be turned into calls of createElement(App, null) which will yeild final DOM element
// to be appended to the DOM element provided by the consumer
