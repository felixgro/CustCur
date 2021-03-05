import DEFAULTS from './defaults';
import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';

import { toggleDefaultCursor, isTouchDevice, containsChild, toNodes } from './utils';

// TODO: classify CustCur

/**
 * Initialize a custom cursor.
 *
 * @param {Object} options
 */
function CustCur(options = {}) {
	this._enabled = false;
	this._options = merge(cloneDeep(DEFAULTS), options);
	this._hoverables = toNodes(this._options.hoverables, this._options.target);

	/**
	 * Enable custom cursor instance at runtime.
	 *
	 * @return {CustCur}
	 */
	this.enable = () => {
		if (this._enabled || isTouchDevice()) return;

		this._enabled = true;

		this._createCursor();
		this._toggleEventListeners(true);
		this._toggleVisibility(false);

		if (this._options.hideDefault) toggleDefaultCursor(this._options.target, false);

		return this;
	};

	/**
	 * Disable custom cursor instance at runtime.
	 *
	 * @return {CustCur}
	 */
	this.disable = () => {
		if (!this._enabled) return;

		this._enabled = false;

		this._toggleEventListeners(false);
		this._toggleVisibility(false);

		if (this._options.hideDefault) toggleDefaultCursor(this._options.target, true);

		return this;
	};

	/**
	 * Toggle enabled state of custom cursor instance.
	 *
	 * @return {CustCur}
	 */
	this.toggle = () => (this._enabled ? this.disable() : this.enable());

	/**
	 * Move node element to current cursor position
	 * and proxy the mousemove event withing the target to
	 * the specified onMove() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	this._onMove = (e) => {
		if (!this._enabled) return;
		this._toggleVisibility(true);

		this._node.style.top = `${e.clientY}px`;
		this._node.style.left = `${e.clientX}px`;

		this._options.onMove(e);
	};

	/**
	 * Define a callback for cursor-move event within specified target.
	 *
	 * @param {function} callback
	 */
	this.onMove = (callback) => (this._options.onMove = callback);

	/**
	 * Set the cursors visibility to true and proxy
	 * the mouseover event from target to the
	 * specified onEnter() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	this._onEnter = (e) => {
		if (!this._enabled || containsChild(this._options.target, e.fromElement)) return;

		this._toggleVisibility(true);

		this._options.onEnter(e);
	};

	/**
	 * Define a callback for the cursor-enter event of specified target.
	 *
	 * @param {function} callback
	 */
	this.onEnter = (callback) => (this._options.onEnter = callback);

	/**
	 * Set the cursors visibility to false and proxy
	 * the mouseout event from target to
	 * the specified onLeave() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	this._onLeave = (e) => {
		if (!this._enabled || containsChild(this._options.target, e.toElement)) return;

		this._toggleVisibility(false);

		this._options.onLeave(e);
	};

	/**
	 * Define a callback for the cursor-leave event of specified target.
	 *
	 * @param {function} callback
	 */
	this.onLeave = (callback) => (this._options.onLeave = callback);

	/**
	 * Add defined hover classname to cursor node
	 * and proxy the mouseover event from hoverables to
	 * the specified onHover() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	this._onHover = (e) => {
		if (!this._enabled) return;

		this._node.classList.add(this._options.classes.hover);

		this._options.onHover(e);
	};

	/**
	 * Define a callback for the cursor-hover event on all specified hoverables.
	 *
	 * @param {function} callback
	 */
	this.onHover = (callback) => (this._options.onHover = callback);

	/**
	 * Remove defined hover classname from cursor node
	 * and proxy the mouseout event from hoverables to
	 * the specified onUnhover() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	this._onUnhover = (e) => {
		if (!this._enabled) return;

		this._node.classList.remove(this._options.classes.hover);

		this._options.onUnhover(e);
	};

	/**
	 * Define a callback for the cursor-unhover event on all specified hoverables.
	 *
	 * @param {function} callback
	 */
	this.onUnhover = (callback) => (this._options.onUnhover = callback);

	/**
	 * Add defined click classname to cursor node
	 * and proxy the mousedown event within target to
	 * the specified onClick() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	this._onClick = (e) => {
		if (!this._enabled) return;

		this._node.classList.add(this._options.classes.click);

		this._options.onClick(e);
	};

	/**
	 * Define a callback for the cursor-click event within specified target.
	 *
	 * @param {function} callback
	 */
	this.onClick = (callback) => (this._options.onClick = callback);

	/**
	 * Remove defined click classname from cursor node
	 * and proxy the mouseup event within target to
	 * the specified onClickRelease() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	this._onClickRelease = (e) => {
		if (!this._enabled) return;

		this._node.classList.remove(this._options.classes.click);

		this._options.onClickRelease(e);
	};

	/**
	 * Define a callback for the cursor-clickrelease event within specified target.
	 *
	 * @param {function} callback
	 */
	this.onClickRelease = (callback) => (this._options.onClickRelease = callback);

	/**
	 * Toggle the visibility of specified cursor node.
	 *
	 * @param {Boolean} isVisible
	 */
	this._toggleVisibility = (isVisible) => {
		this._node.style.visibility = isVisible ? 'visible' : 'hidden';
		this._node.style.opacity = isVisible ? 1 : 0;
	};

	/**
	 * Create a new cursor node if none present.
	 *
	 * @return {Node}
	 */
	this._createCursor = () => {
		if (this._node) return;

		this._node = this._options.node ?? document.createElement(this._options.tag);

		Object.assign(this._node.style, {
			position: 'fixed',
			'pointer-events': `none`,
		});

		if (!this._options.node) {
			this._node.classList.add(this._options.classes.base);
			document.body.appendChild(this._node);
		}

		return this._node;
	};

	/**
	 * Attach or detach necessary eventlisteners on specified
	 * target and hoverables.
	 *
	 * @param {Boolean} state
	 */
	this._toggleEventListeners = (state) => {
		const target = this._options.target;

		target.onmousemove = state ? this._onMove.bind(this) : null;
		target.onmouseover = state ? this._onEnter.bind(this) : null;
		target.onmouseout = state ? this._onLeave.bind(this) : null;
		target.onmousedown = state ? this._onClick.bind(this) : null;
		target.onmouseup = state ? this._onClickRelease.bind(this) : null;

		this._hoverables.forEach((hov) => {
			hov.onmouseover = state ? this._onHover.bind(this) : null;
			hov.onmouseout = state ? this._onUnhover.bind(this) : null;
		});
	};

	return this.enable();
}

export default CustCur;
