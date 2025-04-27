import RenderCycleManager from "../../shared/renderCycle.js";
import haveDepsChanged from "../helpers/diffDeps.js";

const useMemo = (computationCallback, dependencies) => {
	RenderCycleManager.current.context.incrementHookNumberForCurrentComponent();

	const valueSetter = RenderCycleManager.current.context.hookValueSetterGenerator();
	const valueGetter = RenderCycleManager.current.context.hookValueGetterGenerator();

	const prevDeps = RenderCycleManager.current.context.isInitialValueSet()
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
