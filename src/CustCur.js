const DEFAULTS = require('./defaults');
const { merge, cloneDeep } = require('lodash');

const {
	toggleEventListeners,
	toggleDefaultCursor,
	toNodes
} = require('./helpers');


function CustCur (options = {}) {

	this._enabled = false;
	this._options = merge(cloneDeep(DEFAULTS), options);
	this._hoverables = toNodes(this._options.hoverables, this._options.target);


	/**
	 * Toggle enabled state of custom cursor instance.
	 *
	 * @return {CustCur}
	 */
	this.toggle = () => this._enabled ? this.disable() : this.enable();


	/**
	 * Enable custom cursor instance at runtime.
	 *
	 * @return {CustCur}
	 */
	this.enable = () => {
		if(this._enabled) return;
		this._enabled = true;

		toggleEventListeners(this, true);
		if (this._options.hideDefault) toggleDefaultCursor(this._options.target, false);

		if(!this._node) this._createCursor();
		this._toggleVisibility(false);

		return this;
	}


	/**
	 * Disable custom cursor instance at runtime.
	 *
	 * @return {CustCur}
	 */
	this.disable = () => {
		if(!this._enabled) return;

		this._enabled = false;

		toggleEventListeners(this, false);
		toggleDefaultCursor(this._options.target, true);

		this._toggleVisibility(false);

		return this;
	}


	this._onEnter = (e) => {
		if(!this._enabled) return;
		this._toggleVisibility(true);

		this._options.onEnter(e);
	}


	this._onLeave = (e) => {
		if(!this._enabled) return;
		this._toggleVisibility(false);

		this._options.onLeave(e);
	}


	this._onMove = (e) => {
		if(!this._enabled) return;
		this._toggleVisibility(true);

		this._node.style.top = `${e.clientY}px`;
		this._node.style.left = `${e.clientX}px`;

		this._options.onMove(e);
	}


	this._onHover = (e) => {
		if(!this._enabled) return;
		this._node.classList.add(this._options.classes.hover);

		this._options.onHover(e);
	}


	this._onUnhover = (e) => {
		if(!this._enabled) return;
		this._node.classList.remove(this._options.classes.hover);

		this._options.onUnhover(e);
	}


	this._onClick = (e) => {
		if(!this._enabled) return;
		this._node.classList.add(this._options.classes.click);

		this._options.onClick(e);
	}


	this._onClickRelease = (e) => {
		if(!this._enabled) return;
		this._node.classList.remove(this._options.classes.click);

		this._options.onClickRelease(e);
	}


	this._toggleVisibility = (isVisible) => {
		this._node.style.visibility = isVisible ? 'visible' : 'hidden';
		this._node.style.opacity = isVisible ? 1 : 0;
	}


	this._createCursor = () => {
		this._node = this._options.node ?? document.createElement(this._options.tag);

		Object.assign(this._node.style, {
			position: 'fixed',
			'pointer-events': `none`
		});

		if (!this._options.node) {
			this._node.classList.add(this._options.classes.base);
			document.body.appendChild(this._node);
		}
	}


	return this.enable();
}

module.exports = CustCur;