import RenderCycleManager from "../../shared/renderCycle.js";
import haveDepsChanged from "../helpers/diffDeps.js";

const useEffect = (callback, dependencies) => {
	RenderCycleManager.current.context.incrementHookNumberForCurrentComponent();

	const componentThisHookIsPartOf =
		RenderCycleManager.current.context.currentComponent;
	const hookNumber = RenderCycleManager.current.context.hookNumberInCurrentComponent;

	if (typeof window === "undefined") return;

	const valueSetter = RenderCycleManager.current.context.hookValueSetterGenerator();
	const valueGetter = RenderCycleManager.current.context.hookValueGetterGenerator();

	const computationOffloadingProvider =
		typeof requestAnimationFrame !== "undefined"
			? requestAnimationFrame
			: setTimeout;

	computationOffloadingProvider(() => {
		// Decouple this from the synchronous render cycle of the component
		// Render it only on first render + if any dependencies change

		const prevDeps = RenderCycleManager.current.context.isInitialValueSet(
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
