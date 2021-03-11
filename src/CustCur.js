import * as utils from './utils';
import defaults from './defaults';

import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';

class CustCur {
	/**
	 * Initialize a custom cursor and overwrite default
	 * settings using an optional options parameter.
	 *
	 * @param {Object} options
	 */
	constructor(options = {}) {
		this._enabled = false;
		this._options = merge(cloneDeep(defaults), options);
		this._hoverables = utils.toNodes(this._options.hoverables, this._options.target);

		this._node = this._options.node ? this._options.node : document.createElement(this._options.tag);

		this.hoveringNode = null;

		Object.assign(this._node.style, {
			position: 'fixed',
			'pointer-events': 'none',
		});

		if (!this._options.node) {
			this._node.classList.add(this._options.classes.base);
			document.body.appendChild(this._node);
		}

		return this.enable();
	}

	/**
	 * Get the cursor's current state.
	 *
	 * @return {Boolean}
	 */
	get state() {
		return this._enabled;
	}

	/**
	 * Get the all cursor's hoverable nodes.
	 *
	 * @return {Array}
	 */
	get hoverables() {
		return this._hoverables;
	}

	/**
	 * Enable custom cursor instance at runtime.
	 *
	 * @return {CustCur}
	 */
	enable() {
		if (this._enabled || utils.isTouchDevice()) return;

		this._enabled = true;

		this._toggleEventListeners(true);
		this._toggleVisibility(false);

		if (this._options.hideDefault) utils.toggleDefaultCursor(this._options.target, false);

		return this;
	}

	/**
	 * Disable custom cursor instance at runtime.
	 *
	 * @return {CustCur}
	 */
	disable() {
		if (!this._enabled) return;

		this._enabled = false;

		this._toggleEventListeners(false);
		this._toggleVisibility(false);

		if (this._options.hideDefault) toggleDefaultCursor(this._options.target, true);

		return this;
	}

	/**
	 * Toggle enabled state of custom cursor instance at runtime.
	 *
	 * @return {CustCur}
	 */
	toggle() {
		return this._enabled ? this.disable() : this.enable();
	}

	/**
	 * Define a custom callback for a mouse-over event within the specified target.
	 *
	 * @param {function} callback
	 */
	onEnter(callback) {
		this._options.onEnter = callback;
	}

	/**
	 * Define a custom callback for a mouse-out event within the specified target.
	 *
	 * @param {function} callback
	 */
	onLeave(callback) {
		this._options.onLeave = callback;
	}

	/**
	 * Define a custom callback for a mouse-move event within the specified target.
	 *
	 * @param {function} callback
	 */
	onMove(callback) {
		this._options.onMove = callback;
	}

	/**
	 * Define a custom callback for the mouse-down event within the specified target.
	 *
	 * @param {function} callback
	 */
	onClick(callback) {
		this._options.onClick = callback;
	}

	/**
	 * Define a custom callback for the mouse-up event within the specified target.
	 *
	 * @param {function} callback
	 */
	onClickRelease(callback) {
		this._options.onClickRelease = callback;
	}

	/**
	 * Define a custom callback for the mouse-over event on all specified hoverables.
	 *
	 * @param {function} callback
	 */
	onHoverEnter(callback) {
		this._options.onHoverEnter = callback;
	}

	/**
	 * Define a custom callback for the mouse-out event on all specified hoverables.
	 *
	 * @param {function} callback
	 */
	onHoverLeave(callback) {
		this._options.onHoverLeave = callback;
	}

	/**
	 * Set the cursors visibility to true and proxy
	 * the mouseover event to the specified onEnter()
	 * callback method.
	 *
	 * @param {MouseEvent} e
	 */
	_onEnter(e) {
		if (!this._enabled || utils.containsChild(this._options.target, e.fromElement)) return;

		this._toggleVisibility(true);

		this._options.onEnter(e);
	}

	/**
	 * Set the cursors visibility to false and proxy
	 * the mouseout event to the specified onLeave()
	 * callback method.
	 *
	 * @param {MouseEvent} e
	 */
	_onLeave(e) {
		if (!this._enabled || utils.containsChild(this._options.target, e.toElement)) return;

		this._toggleVisibility(false);

		if (this.hoveringNode) {
			this._options.onHoverLeave(e);
			this.hoveringNode = null;
		}

		this._options.onLeave(e);
	}

	/**
	 * Move node element to current cursor position
	 * and proxy the mousemove event to the specified
	 * onMove() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	_onMove(e) {
		if (!this._enabled) return;
		this._toggleVisibility(true);

		this._node.style.top = `${e.clientY}px`;
		this._node.style.left = `${e.clientX}px`;

		this._options.onMove(e);
	}

	/**
	 * Add defined click classname to cursor node
	 * and proxy the mousedown event to the specified
	 * onClick() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	_onClick(e) {
		if (!this._enabled) return;

		this._node.classList.add(this._options.classes.click);

		this._options.onClick(e);
	}

	/**
	 * Remove defined click classname from cursor node
	 * and proxy the mouseup event to the specified
	 * onClickRelease() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	_onClickRelease(e) {
		if (!this._enabled) return;

		this._node.classList.remove(this._options.classes.click);

		this._options.onClickRelease(e);
	}

	/**
	 * Add defined hover classname to cursor node
	 * and proxy the mouseover event from all hoverables to
	 * the specified onHoverEnter() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	_onHoverEnter(e) {
		if (!this._enabled || !this.hoverables.includes(e.toElement) || utils.containsChild(e.toElement, e.fromElement)) return;

		if (this.hoveringNode) this._options.onHoverLeave(e);

		this.hoveringNode = e.toElement;

		this._node.classList.add(this._options.classes.hover);

		this._options.onHoverEnter(e);
	}

	/**
	 * Remove defined hover classname from cursor node
	 * and proxy the mouseout event from all hoverables to
	 * the specified onHoverLeave() callback method.
	 *
	 * @param {MouseEvent} e
	 */
	_onHoverLeave(e) {
		if (!this._enabled || !this.hoveringNode || utils.containsChild(this.hoveringNode, e.toElement) || !this.hoverables.includes(e.fromElement))
			return;

		this._node.classList.remove(this._options.classes.hover);

		this._options.onHoverLeave(e);

		this.hoveringNode = null;
	}

	/**
	 * Toggle the visibility of specified cursor node.
	 *
	 * @param {Boolean} isVisible
	 */
	_toggleVisibility(isVisible) {
		if (!this._node) return;

		this._node.style.visibility = isVisible ? 'visible' : 'hidden';
		this._node.style.opacity = isVisible ? 1 : 0;
	}

	/**
	 * Attach or detach necessary eventlisteners on specified
	 * target and hoverables.
	 *
	 * @param {Boolean} state
	 */
	_toggleEventListeners(state) {
		const target = this._options.target;

		target.onmousemove = state ? this._onMove.bind(this) : null;
		target.onmouseover = state ? this._onEnter.bind(this) : null;
		target.onmouseout = state ? this._onLeave.bind(this) : null;
		target.onmousedown = state ? this._onClick.bind(this) : null;
		target.onmouseup = state ? this._onClickRelease.bind(this) : null;

		this._hoverables.forEach((hov) => {
			hov.onmouseover = state ? this._onHoverEnter.bind(this) : null;
			hov.onmouseout = state ? this._onHoverLeave.bind(this) : null;
		});
	}
}

export default CustCur;
