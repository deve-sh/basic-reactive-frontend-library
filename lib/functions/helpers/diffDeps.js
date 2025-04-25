export default function haveDepsChanged(prevDeps = [], newDeps = []) {
	return newDeps.some((val, index) => val !== prevDeps[index]);
}
