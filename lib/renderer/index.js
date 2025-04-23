export default function render(evaluatedComponent, domElement) {
	if (!domElement) throw new Error("DOM Element not provided");

	if (!evaluatedComponent || !(evaluatedComponent instanceof Node))
		throw new Error("Component not provided");

	domElement.appendChild(evaluatedComponent);
}

// Usage: render(<App />, document.querySelector('#root'))
// <App /> will be turned into calls of createElement(App, null) which will yeild final DOM element
// to be appended to the DOM element provided by the consumer
