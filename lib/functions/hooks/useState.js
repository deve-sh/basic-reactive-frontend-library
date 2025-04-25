import RenderCycle from "../../shared/renderCycle";

const useState = (initialValue) => {
	RenderCycle.current.context.incrementHookNumberForCurrentComponent();
	RenderCycle.current.context.setInitialValue(initialValue);

	const valueSetter =
		RenderCycle.current.context.hookValueSetterGenerator(true);
	const valueGetter = RenderCycle.current.context.hookValueGetterGenerator();

	return [valueGetter(), valueSetter];
};

export default useState;
