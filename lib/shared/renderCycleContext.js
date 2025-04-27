import * as hooksBasedState from "./hooksBasedState.js";
import RenderCycleManager from "./renderCycle.js";

const initial = {
	component: null,
	hookNumber: 0,
};

const prevRenderCycleForComponents = new Map();

class RenderCycleContextContainer {
	current = initial;

	get currentComponent() {
		return this.current.component;
	}

	get hookNumberInCurrentComponent() {
		return this.current.hookNumber;
	}

	set currentComponent(newComponentFunction) {
		if (!newComponentFunction) return;

		if (this.currentComponent) {
			// The render cycle for the current component is finished.
			// Validate from memory if the number of hooks are consistent between render cycles to prevent issues
			if (prevRenderCycleForComponents.has(this.currentComponent)) {
				const lastRenderCycleHookNumber = prevRenderCycleForComponents.get(
					this.currentComponent
				).hookNumber;

				if (lastRenderCycleHookNumber !== this.hookNumberInCurrentComponent) {
					throw new Error(
						"Different number of hooks rendered than the last cycle. Please fix your component " +
							this.currentComponent.name
					);
				}
			}

			prevRenderCycleForComponents.set(this.currentComponent, {
				hookNumber: this.hookNumberInCurrentComponent,
			});
		}

		// Reset
		this.current = { component: newComponentFunction, hookNumber: 0 };
	}

	incrementHookNumberForCurrentComponent() {
		this.current.hookNumber++;
	}

	isInitialValueSet(component, hookNumber) {
		// Defaults to current component and current component's hook number
		// But can also return value from an explicitly passed component and hook number
		return hooksBasedState.isInitialValueSet(
			component ?? this.currentComponent,
			hookNumber ?? this.hookNumberInCurrentComponent
		);
	}

	setInitialValue(value, component, hookNumber) {
		// Defaults to current component and current component's hook number
		// But can set value from an explicitly passed component and hook number
		if (
			hooksBasedState.isInitialValueSet(
				component ?? this.currentComponent,
				hookNumber ?? this.hookNumberInCurrentComponent
			)
		)
			return;

		hooksBasedState.set(
			component ?? this.currentComponent,
			hookNumber ?? this.hookNumberInCurrentComponent,
			value
		);
	}

	hookValueSetterGenerator(
		// Set to true or false based on the kind of behaviour needed from hook
		// For a hook like useState, the changing of values is done by the dispatcher function
		// While hooks such as useEffect and useMemo simply execute and register return values for use later instead of being reactive
		isReactiveHook
	) {
		const component = this.currentComponent;
		const hookNumber = this.hookNumberInCurrentComponent;

		return function (newValue) {
			const existingValue = hooksBasedState.get(component, hookNumber);

			hooksBasedState.set(component, hookNumber, newValue);

			if (isReactiveHook && existingValue !== newValue) {
				// Trigger a re-render of the application based on this state value change
				console.log("Re-rendering");
				RenderCycleManager.current.rerender();
			}
		};
	}

	hookValueGetterGenerator() {
		const component = this.currentComponent;
		const hookNumber = this.hookNumberInCurrentComponent;

		return function () {
			return hooksBasedState.get(component, hookNumber);
		};
	}

	reset() {
		this.current = initial;
	}
}

export default new RenderCycleContextContainer();
