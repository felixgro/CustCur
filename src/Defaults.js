module.exports = {
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
	onMove: (e) => {},
	onEnter: (e) => {},
	onLeave: (e) => {},
	onHover: (e) => {},
	onUnhover: (e) => {},
	onClick: (e) => {},
	onClickRelease: (e) => {}
}