/**
 * Converts a given array of css-selectors into an
 * array of node objects within the specified target.
 *
 * @param {String[]|Node[]} array
 * @param {Node|window} target
 * @return {Node[]}
 */
const toNodes = (array, target) => {
	if (target === window)
		target = document.querySelector('html');

	let nodes = [];

	array.forEach(n => {
		if(n instanceof Node) {
			nodes.push(n);
		} else {
			nodes.push(...target.querySelectorAll(n));
		}
	});

	return nodes;
}


/**
 * Apply/Remove necessary eventlisteneres on a
 * given custcur instance.
 *
 * @param {CustCur} cursorInstance
 * @param {Boolean} state
 */
const toggleEventListeners = (cursorInstance, state) => {
	const target = cursorInstance._options.target;

	target.onmousemove = state ? cursorInstance._onMove.bind(cursorInstance) : null;
	target.onmouseover = state ? cursorInstance._onEnter.bind(cursorInstance) : null;
	target.onmouseout = state ? cursorInstance._onLeave.bind(cursorInstance) : null;
	target.onmousedown = state ? cursorInstance._onClick.bind(cursorInstance) : null;
	target.onmouseup = state ? cursorInstance._onClickRelease.bind(cursorInstance) : null;

	cursorInstance._hoverables.forEach(el => {
		el.onmouseover = state ? cursorInstance._onHover.bind(cursorInstance) : null;
		el.onmouseout = state ? cursorInstance._onUnhover.bind(cursorInstance) : null;
	});
}


/**
 * Set visibility of default cursor to
 * specified state.
 *
 * @param {Node} el
 * @param {Boolean} state
 */
const toggleDefaultCursor = (el, state) => {
	const target = (el == window) ? document.querySelector('html') : el;

	target.style.cursor = state ? 'auto' : 'none';

	if (target.childNodes.length > 0) {
		target.childNodes.forEach(n => {
			if (n.nodeType == 1) toggleDefaultCursor(n, state);
		})
	}
}


/**
 * TODO: Import Styles from external css file.
 */
const setStyles = () => {
	const style = document.createElement('style');
	style.innerHTML = `
		.cc-cursor {
			height: 9px;
			width: 9px;
			background: #111;
			transform: translate(-50%, -50%);
			border-radius: 50%;
		}
		.cc-cursor::before {
			content: '';
			position: fixed;
			height: 18px;
			width: 18px;
			border-radius: 50%;
			border: 1px solid #111;
			transform: translate(-5.5px, -5.5px);
			transition: transform 60ms ease-out;
		}
		.cc-hover::before {
			transform: translate(-5.5px, -5.5px) scale(1.4);
		}
		.cc-click::before {
			transform: translate(-5.5px, -5.5px) scale(1);
		}
	`;
	document.body.appendChild(style);
}

module.exports = {
	toggleEventListeners,
	toggleDefaultCursor,
	setStyles,
	toNodes
}