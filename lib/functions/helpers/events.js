const eventsToDelegate = ["onClick", "onInput", "onChange"];

export default function mountEventDelegationListeners(domNodeContainer) {
	for (const eventName of eventsToDelegate) {
		domNodeContainer.addEventListener(
			eventName.toLowerCase().split("on").pop(),
			(event) => {
				let node = event.target;

				while (node) {
					const userDefinedEventHandler = node.__internalProps?.[eventName];

					// Trigger events for all the nodes that have defined `onClick` events
					if (userDefinedEventHandler) userDefinedEventHandler(event);

					node = node.parentNode;
				}
			}
		);
	}
}
