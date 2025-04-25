import RenderCycle from "../../shared/renderCycle";
import haveDepsChanged from "../helpers/diffDeps";

const useMemo = (computationCallback, dependencies) => {
	RenderCycle.current.context.incrementHookNumberForCurrentComponent();

	const valueSetter = RenderCycle.current.context.hookValueSetterGenerator();
	const valueGetter = RenderCycle.current.context.hookValueGetterGenerator();

	const prevDeps = RenderCycle.current.context.isInitialValueSet()
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
