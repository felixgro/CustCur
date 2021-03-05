export default {
	target: window,
	node: null,
	tag: 'div',
	classes: {
		base: 'cc-cursor',
		hover: 'cc-hover',
		click: 'cc-click',
	},
	hoverables: ['a', 'button'],
	hideDefault: true,
	onEnter: (e) => {},
	onLeave: (e) => {},
	onMove: (e) => {},
	onClick: (e) => {},
	onClickRelease: (e) => {},
	onHoverEnter: (e) => {},
	onHoverLeave: (e) => {},
};
