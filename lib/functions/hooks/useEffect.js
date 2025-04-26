import RenderCycle from "../../shared/renderCycle.js";
import haveDepsChanged from "../helpers/diffDeps.js";

const useEffect = (callback, dependencies) => {
	RenderCycle.current.context.incrementHookNumberForCurrentComponent();

	const componentThisHookIsPartOf =
		RenderCycle.current.context.currentComponent;
	const hookNumber = RenderCycle.current.context.hookNumberInCurrentComponent;

	if (typeof window === "undefined") return;

	const valueSetter = RenderCycle.current.context.hookValueSetterGenerator();
	const valueGetter = RenderCycle.current.context.hookValueGetterGenerator();

	const computationOffloadingProvider =
		typeof requestAnimationFrame !== "undefined"
			? requestAnimationFrame
			: setTimeout;

	computationOffloadingProvider(() => {
		// Decouple this from the synchronous render cycle of the component
		// Render it only on first render + if any dependencies change

		const prevDeps = RenderCycle.current.context.isInitialValueSet(
			componentThisHookIsPartOf,
			hookNumber
		)
			? valueGetter().dependencies
			: null;

		if (!prevDeps || !dependencies) {
			const cleanup = callback();
			valueSetter({ cleanup, dependencies });
		} else if (haveDepsChanged(prevDeps, dependencies)) {
			const cleanup = callback();
			valueSetter({ cleanup, dependencies });
		}
	});
};

export default useEffect;
