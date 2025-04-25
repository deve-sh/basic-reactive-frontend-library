import renderCycleManager from "../../shared/renderCycle";
import haveDepsChanged from "../helpers/diffDeps";

const useEffect = (callback, dependencies) => {
	renderCycleManager.incrementHookNumberForCurrentComponent();

	if (typeof window === "undefined") return;

	const valueSetter = renderCycleManager.hookValueSetterGenerator();
	const valueGetter = renderCycleManager.hookValueGetterGenerator();

	const computationOffloadingProvider =
		typeof requestAnimationFrame !== "undefined"
			? requestAnimationFrame
			: setTimeout;

	computationOffloadingProvider(() => {
		// Decouple this from the synchronous render cycle of the component
		// Render it only on first render + if any dependencies change

		const prevDeps = renderCycleManager.isInitialValueSet()
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
