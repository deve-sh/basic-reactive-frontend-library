import RenderCycleManager from "../../shared/renderCycle.js";

const useState = (initialValue) => {
	RenderCycleManager.current.context.incrementHookNumberForCurrentComponent();
	RenderCycleManager.current.context.setInitialValue(initialValue);

	const valueSetter =
		RenderCycleManager.current.context.hookValueSetterGenerator(true);
	const valueGetter = RenderCycleManager.current.context.hookValueGetterGenerator();

	return [valueGetter(), valueSetter];
};

export default useState;
