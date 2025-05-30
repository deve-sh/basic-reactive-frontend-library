export default function createElement(type, props, ...children) {
	return {
		type,
		props: { ...props, children: (children || []).flat() },
	};
}
