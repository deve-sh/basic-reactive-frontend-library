import renderCycleManager from "../../shared/renderCycle";
import haveDepsChanged from "../helpers/diffDeps";

const useMemo = (computationCallback, dependencies) => {
	renderCycleManager.incrementHookNumberForCurrentComponent();

	const valueSetter = renderCycleManager.hookValueSetterGenerator();
	const valueGetter = renderCycleManager.hookValueGetterGenerator();

	const prevDeps = renderCycleManager.isInitialValueSet()
		? valueGetter().dependencies
		: null;

	// decide if we want to recompute a heavy computation value during the render cycle
	if (!prevDeps || !dependencies)
		valueSetter({ value: computationCallback(), dependencies });
	else if (haveDepsChanged(valueGetter().dependencies, dependencies))
		valueSetter({ value: computationCallback(), dependencies });

	return valueGetter().value;
};

export default useMemo;
