import renderCycleContext from "./renderCycleContext";

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
}

export default RenderCycle;
