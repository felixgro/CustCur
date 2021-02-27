const setEventListeners = (activate, cursorInstance) => {
	let target = cursorInstance._options.target;

	if(activate) {
		target.onmousemove = cursorInstance._onMove.bind(cursorInstance);
		target.onmouseover = cursorInstance._onEnter.bind(cursorInstance);
		target.onmouseout = cursorInstance._onLeave.bind(cursorInstance);
		target.onclick = cursorInstance._onClick.bind(cursorInstance);
		target.ondblclick = cursorInstance._onDblClick.bind(cursorInstance);
	} else {
		target.onmousemove = null;
		target.onmouseout = null;
		target.onmouseover = null;
		target.onclick = null;
		target.ondblclick = null;
	}

	let hoverables = [];
	if (target == window)
		target = document.querySelector('html');

	cursorInstance._options.hoverables.forEach(hov => {
		if(typeof hov == 'string') {
			hoverables.push(...target.querySelectorAll(hov));
		} else {
			hoverables.push(hov);
		}
	})

	hoverables.forEach(el => {
		el.onmouseover = cursorInstance._onHover.bind(cursorInstance)
		el.onmouseout = cursorInstance._onUnhover.bind(cursorInstance)
	});
	cursorInstance._hoverElements = hoverables;

	return cursorInstance;
}

const hideDefaultCursor = (el) => {
	const target = el == window ? document.querySelector('html') : el;

	target.style.cursor = 'none';

	if (target.childNodes.length > 0) {
		target.childNodes.forEach(n => {
			if (n.nodeType == 1) hideDefaultCursor(n);
		})
	}
}

const showDefaultCursor = (el) => {
	const target = el == window ? document.querySelector('html') : el;

	target.style.cursor = 'auto'

	if (target.childNodes.length > 0) {
		target.childNodes.forEach(n => {
			if (n.nodeType == 1) showDefaultCursor(n);
		})
	}
}

module.exports = {
	setEventListeners,
	hideDefaultCursor,
	showDefaultCursor
}