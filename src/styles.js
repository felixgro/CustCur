module.exports.setStyles = () => {
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