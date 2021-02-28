module.exports = {
	target: window,
	hoverables: ['a', 'button'],
	hideDefaultCursor: true,
	cursor: {
		el: null,
		class: 'cc-cursor',
		hoverClass: 'cc-hover',
		clickClass: 'cc-click',
	},
	onMove: (e) => {},
	onEnter: (e) => {},
	onLeave: (e) => {},
	onHover: (e) => {},
	onUnhover: (e) => {},
	onClick: (e) => {},
	onClickRelease: (e) => {}
}