/**
 * Converts a given array of css-selectors into an
 * array of node objects within the specified target.
 *
 * @param {String[]|Node[]} array
 * @param {Node|window} target
 * @return {Node[]}
 */
const toNodes = (array, target) => {
	if (target === window) target = document.querySelector('html');

	let nodes = [];

	array.forEach((n) => {
		if (n instanceof Node) {
			nodes.push(n);
		} else {
			nodes.push(...target.querySelectorAll(n));
		}
	});

	return nodes;
};

/**
 * Checks if a node is related to one
 * or multiple nodes in a given array.
 *
 * @param  {Node[]} array
 * @param  {Node} child
 * @return {Boolean}
 */
const isChildOfNodes = (array, child) => {
	return array.filter((el) => containsChild(el, child)).length > 0;
};

/**
 * Check if client is using a touch device.
 *
 * @return {Boolean}
 */
const isTouchDevice = () => {
	return window.matchMedia('(pointer: coarse)').matches;
};

/**
 * Check if a parentnode contains, or is equal to,
 * a given child node.
 *
 * @param {Node} parent
 * @param {Node} child
 * @param {Boolean} allowEquals
 * @return {Boolean}
 */
const containsChild = (parent, child, allowEquals = true) => {
	if (!parent) return false;

	parent = parent === window ? document.querySelector('html') : parent;

	if (allowEquals) {
		return child === parent || parent.contains(child);
	} else {
		return parent.tagName === 'HTML' ? containsChild(parent, child) : child !== parent && parent.contains(child);
	}
};

/**
 * Set visibility of the system's default cursor to an
 * specified state on every node nested inside the given parent element.
 *
 * @param {Node} parent
 * @param {Boolean} state
 */
const toggleDefaultCursor = (parent, state) => {
	const target = parent == window ? document.querySelector('html') : parent;

	target.style.cursor = state ? 'auto' : 'none';

	if (target.childNodes.length > 0) {
		target.childNodes.forEach((n) => {
			if (n.nodeType == 1) toggleDefaultCursor(n, state);
		});
	}
};

export { toNodes, isChildOfNodes, isTouchDevice, containsChild, toggleDefaultCursor };
