import renderCycleManager from "../../shared/renderCycle";

const useState = (initialValue) => {
	renderCycleManager.hookCount++;

	renderCycleManager.setInitialValue(initialValue);

	const valueSetter = renderCycleManager.hookValueSetterGenerator(newValue);
	const valueGetter = renderCycleManager.hookValueGetterGenerator();

	return [valueGetter(), valueSetter];
};

export default useState;
