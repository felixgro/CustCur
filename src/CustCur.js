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
		if (this._options.hideDefault) toggleDefaultCursor(this._options.target, true);

		this._toggleVisibility(false);

		return this;
	}


	/**
	 * Toggle enabled state of custom cursor instance.
	 *
	 * @return {CustCur}
	 */
	this.toggle = () => this._enabled ? this.disable() : this.enable();


	/**
	 * Proxy mouseover event from target.
	 *
	 * @param {MouseEvent} e
	 */
	this._onEnter = (e) => {
		if(!this._enabled) return;
		this._toggleVisibility(true);

		this._options.onEnter(e);
	}


	/**
	 * Listen for mouseover event on specified target.
	 *
	 * @param {function} callable
	 */
	this.onEnter = (callable) => this._options.onEnter = callable;


	/**
	 * Proxy mouseout event from target.
	 *
	 * @param {MouseEvent} e
	 */
	this._onLeave = (e) => {
		if(!this._enabled) return;

		this._toggleVisibility(false);

		this._options.onLeave(e);
	}


	/**
	 * Listen for mouseout event within target.
	 *
	 * @param {function} callable
	 */
	this.onLeave = (callable) => this._options.onLeave = callable;


	/**
	 * Proxy mousemove event from target.
	 *
	 * @param {MouseEvent} e
	 */
	this._onMove = (e) => {
		if(!this._enabled) return;
		this._toggleVisibility(true);

		this._node.style.top = `${e.clientY}px`;
		this._node.style.left = `${e.clientX}px`;

		this._options.onMove(e);
	}


	/**
	 * Listen for mousemove event within specified target.
	 *
	 * @param {function} callable
	 */
	this.onMove = (callable) => this._options.onMove = callable;


	/**
	 * Proxy mouseover event from target.
	 *
	 * @param {MouseEvent} e
	 */
	this._onHover = (e) => {
		if(!this._enabled) return;

		this._node.classList.add(this._options.classes.hover);

		this._options.onHover(e);
	}


	/**
	 * Listen for mouseover event within specified target.
	 *
	 * @param {function} callable
	 */
	this.onHover = (callable) => this._options.onHover = callable;


	/**
	 * Proxy mouseout event from target.
	 *
	 * @param {MouseEvent} e
	 */
	this._onUnhover = (e) => {
		if(!this._enabled) return;

		this._node.classList.remove(this._options.classes.hover);

		this._options.onUnhover(e);
	}

	/**
	 * Listen for mouseout event from specified target.
	 *
	 * @param {function} callable
	 */
	this.onUnhover = (callable) => this._options.onUnhover = callable;


	/**
	 * Proxy mousedown events within target.
	 *
	 * @param {MouseEvent} e
	 */
	this._onClick = (e) => {
		if(!this._enabled) return;

		this._node.classList.add(this._options.classes.click);

		this._options.onClick(e);
	}


	/**
	 * Listen for mousedown events withing specified target.
	 *
	 * @param {function} callable
	 */
	this.onClick = (callable) => this._options.onClick = callable;


	/**
	 * Proxy mouseup events within target.
	 *
	 * @param {MouseEvent} e
	 */
	this._onClickRelease = (e) => {
		if(!this._enabled) return;

		this._node.classList.remove(this._options.classes.click);

		this._options.onClickRelease(e);
	}


	/**
	 * Listen for mouseup events withing specified target.
	 *
	 * @param {function} callable
	 */
	this.onClickRelease = (callable) => this._options.onClickRelease = callable;


	/**
	 * Toggle visibility of cursor.
	 *
	 * @param {Boolean} isVisible
	 */
	this._toggleVisibility = (isVisible) => {
		this._node.style.visibility = isVisible ? 'visible' : 'hidden';
		this._node.style.opacity = isVisible ? 1 : 0;
	}

	/**
	 * Creates the cursor node if necessary and assigns
	 * important css rules.
	 *
	 */
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