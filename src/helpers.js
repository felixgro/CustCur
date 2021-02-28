const setEventListeners = (activate, cursorInstance) => {
	let target = cursorInstance._options.target;

	if(activate) {
		target.onmousemove = cursorInstance._onMove.bind(cursorInstance);
		target.onmouseover = cursorInstance._onEnter.bind(cursorInstance);
		target.onmouseout = cursorInstance._onLeave.bind(cursorInstance);
		target.onmousedown = cursorInstance._onClick.bind(cursorInstance);
		target.onmouseup = cursorInstance._onClickRelease.bind(cursorInstance);
	} else {
		target.onmousemove = null;
		target.onmouseout = null;
		target.onmouseover = null;
		target.onclick = null;
		target.onmouseup = null;
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
	setEventListeners,
	hideDefaultCursor,
	showDefaultCursor,
	setStyles
}