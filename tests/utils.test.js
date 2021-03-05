import * as utils from '../src/utils';

import { createNodesWithClasses } from './_helpers';

describe('toNodes(array, target)', () => {
	test('returns an array', () => {
		const classes = createNodesWithClasses(['c-1', 'c-2', 'c-3']);

		expect(utils.toNodes(classes, document.body)).toBeInstanceOf(Array);
	});

	test('applies css selectors', () => {
		const classes = createNodesWithClasses(['class-1', 'class-2', 'class-3']);

		const nodes = utils.toNodes(classes, document.body);

		expect(nodes.length).toBe(classes.length);
		nodes.forEach((n) => expect(n).toBeInstanceOf(HTMLDivElement));
	});

	test('can contain node elements', () => {
		const classes = createNodesWithClasses(['another-class-1', 'another-class-2']);
		classes.push(document.createElement('span'));

		const nodes = utils.toNodes(classes, document.body);

		expect(nodes.length).toBe(classes.length);
		expect(nodes[0]).toBeInstanceOf(HTMLDivElement);
		expect(nodes[1]).toBeInstanceOf(HTMLDivElement);
		expect(nodes[2]).toBeInstanceOf(HTMLSpanElement);
	});

	test('only returns nodes nested in given target node', () => {
		const parent = document.createElement('section');

		const classes = createNodesWithClasses(['ac-1', 'ac-2'], 'div', parent);

		const notNested = document.createElement('div');
		notNested.className = 'ac-1';
		document.body.appendChild(notNested);

		document.body.appendChild(parent);

		const nodes = utils.toNodes(classes, parent);

		expect(nodes.length).toBe(2);
		expect(nodes).not.toContain(notNested);
	});
});

describe('containsChild(parent, child)', () => {
	test('returns true if child is nested within parent', () => {
		const el1 = document.createElement('section');
		const el2 = document.createElement('button');

		el1.appendChild(el2);

		expect(utils.containsChild(el1, el2)).toBeTruthy();
	});

	test('returns true if child is equal to parent', () => {
		const el = document.createElement('section');

		expect(utils.containsChild(el, el)).toBeTruthy();
	});

	test('returns false if child is not nested within parent', () => {
		const el1 = document.createElement('section');
		const el2 = document.createElement('button');

		expect(utils.containsChild(el1, el2)).toBeFalsy();
	});
});

describe('toggleDefaultCursor(target, state)', () => {
	test('modifies css cursor rule for target', () => {
		utils.toggleDefaultCursor(document.body, false);

		expect(document.body.style.cursor).toBe('none');

		utils.toggleDefaultCursor(document.body, true);

		expect(document.body.style.cursor).toBe('auto');
	});

	test('recursively modifies css cursor rule for all childs of target', () => {
		const child = document.createElement('button');
		document.body.appendChild(child);

		utils.toggleDefaultCursor(document.body, false);

		expect(child.style.cursor).toBe('none');

		utils.toggleDefaultCursor(document.body, true);

		expect(child.style.cursor).toBe('auto');
	});
});
