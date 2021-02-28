const { merge } = require('lodash');

const {
	setEventListeners,
	hideDefaultCursor,
	showDefaultCursor
} = require('./helpers');


function CustCur (options = {}) {

	this._options = merge(require('./defaults.js'), options);
	this._enabled = false;


	this.enable = () => {
		if(this._enabled) return;

		this._enabled = true;
		setEventListeners(true, this);
		hideDefaultCursor(this._options.target);
		this._createCursor();
		this._toggleVisibility(false);

		return this;
	}


	this.disable = () => {
		if(!this._enabled) return;

		this._enabled = false;
		setEventListeners(false, this);
		showDefaultCursor(this._options.target);
		this._removeCursor();

		return this;
	}


	this._onEnter = (e) => {
		this._toggleVisibility(true);

		this._options.onEnter(e);
	}


	this._onLeave = (e) => {
		this._toggleVisibility(false);

		this._options.onLeave(e);
	}


	this._onMove = (e) => {
		if(!this._enabled) return;

		this._toggleVisibility(true);
		this._el.style.top = `${e.clientY}px`;
		this._el.style.left = `${e.clientX}px`;

		this._options.onMove(e);
	}


	this._onHover = (e) => {
		if(!this._enabled) return;
		this._el.classList.add(this._options.cursor.hoverClass);

		this._options.onHover(e);
	}


	this._onUnhover = (e) => {
		if(!this._enabled) return;
		this._el.classList.remove(this._options.cursor.hoverClass);

		this._options.onUnhover(e);
	}


	this._onClick = (e) => {
		if(!this._enabled) return;
		this._el.classList.add(this._options.cursor.clickClass);

		this._options.onClick(e);
	}


	this._onClickRelease = (e) => {
		if(!this._enabled) return;
		this._el.classList.remove(this._options.cursor.clickClass);

		this._options.onClickRelease(e);
	}


	this._toggleVisibility = (isVisible) => {
		this._el.style.visibility = isVisible ? 'visible' : 'hidden';
		this._el.style.opacity = isVisible ? 1 : 0;
	}


	this._createCursor = () => {
		this._el = this._options.cursor.el ?? document.createElement(this._options.cursor.tag);
		this._el.classList.add(this._options.cursor.class);

		Object.assign(this._el.style, {
			position: 'fixed',
			'pointer-events': `none`
		});

		if (!this._options.cursor.el)
			document.body.appendChild(this._el);
	}


	this._removeCursor = () => {
		if(this._options.cursor.el) {
			this._toggleVisibility(false);
		} else {
			this._el = null;
			document.querySelector(`.${this._options.cursor.class}`).remove();
		}
	}


	return this.enable();
}

module.exports = CustCur;