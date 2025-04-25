import renderCycleManager from "../../shared/renderCycle";

const useState = (initialValue) => {
	renderCycleManager.incrementHookNumberForCurrentComponent();
	renderCycleManager.setInitialValue(initialValue);

	const valueSetter = renderCycleManager.hookValueSetterGenerator(true);
	const valueGetter = renderCycleManager.hookValueGetterGenerator();

	return [valueGetter(), valueSetter];
};

export default useState;
