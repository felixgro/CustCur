module.exports = {
	target: window,
	hoverables: ['a', 'button', 'input'],
	hideDefaultCursor: true,
	cursor: {
		tag: 'div',
		size: 18,
		class: 'custom-cursor',
		hoverClass: 'cc-hover',
		shape: 'circle',
		bg: null,
		border: '#111',
		borderWidth: 3,
	},
	onMove: (e) => {},
	onEnter: (e) => {},
	onLeave: (e) => {},
	onHover: (e) => {},
	onUnhover: (e) => {},
	onClick: (e) => {},
	onDblClick: (e) => {},
}