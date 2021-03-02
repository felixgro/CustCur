# custcur
![npm](https://img.shields.io/npm/v/custcur?color=1c1c1c) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/felixgro/custcur?color=1c1c1c&label=size)

A lightweight, highly customizable cursor framework for the web.

## Installation
#### Via CDN
```html
<script src="https://cdn.jsdelivr.net/npm/custcur@0.1.0">
```
#### Via NPM
1. Install in terminal:
```shell
npm i custcur --save
```

2. Initialize a custom cursor with default options:
```javascript
const CustCur = require('custcur')

const cursor = new CustCur()
```

## Usage
You can pass an options object as a parameter to the constructor to overwrite defaults:
```javascript
const options = {
	target: document.querySelector('.section-1'),
	tag: 'div',
	classes: {
		base: 'cursor',
		hover: 'cursor-hover',
		click: 'cursor-click'
	}
}

const cursor = new CustCur(options)
```

You can also assign an existing html element as your custom cursor node:
```javascript
const cursor = new CustCur({
	target: window,
	node: document.querySelector('.custom-cursor')
})
```
The `tag` and `classes.base` parameters will be totally ignored if a node is present. Nevertheless the specified node will get the defined classes when an related event occured within the target.

### Available Options
| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `target` | Node | Parent Element for custom cursor. | `window` |
| `node` | Node? | Custom cursor node element. If not present, CusCur will create a node of the specified tag and assign the defined classname. | `null` |
| `hoverables` | Array | Array of css-selectors or node elements within the specified target that should trigger the cursor's hover event. | `['a', 'button']` |
| `hideDefault` | Boolean | Determine if the system's default cursor should be hidden when inside of specified target. | `true` |
| `classes.base` | String | Specifies the cursor's base classname. |`'cc-cursor'` |
| `classes.hover` | String | Specifies a classname for the cursor's hover state. | `'cc-hover'` |
| `classes.click` | String | Specifies a classname for the cursor's click state.  | `'cc-click'` |
| `onEnter` | Method | Listen for `mouseover` event on specified target. | `(e)=>{}` |
| `onLeave` | Method | Listen for `mouseout` event on specified target. | `(e)=>{}` |
| `onMove` | Method | Listen for `mousemove` event on specified target. | `(e)=>{}` |
| `onClick` | Method | Listen for `mousedown` event within specified target. | `(e)=>{}` |
| `onClickRelease` | Method | Listen for `mouseup` event within specified target. | `(e)=>{}` |
| `onHover` | Method | Listen for `mouseover` event on all specified hoverables. | `(e)=>{}` |
| `onUnhover` | Method | Listen for `mouseout` event on all specified hoverables. | `(e)=>{}` |

<small align="right">...? type can be `null`. </small>

### Available Methods
| Method | Description |
| --- | --- |
| **State** |  |
| `cursor.enable()` | Enable custom cursor along with all event listeners. |
| `cursor.disable()` | Disable custom cursor and remove all event listeners. |
| `cursor.toggle()` | Toggle between enabled and disabled state. |
| **Events** |  |
| `cursor.onEnter()` | Register a callback function for `mouseover` event on specified target. |
| `cursor.onLeave()` | Register a callback function for `mouseout` event on specified target. |
| `cursor.onMove()` |Register a callback function for `mousemove` event on specified target. |
| `cursor.onClick()` | Register a callback function for `mousedown` event within specified target. |
| `cursor.onClickRelease()` | Register a callback function for `mouseup` event within specified target. |
| `cursor.onHover()` | Register a callback function for `mouseover` event on all specified hoverables. |
| `cursor.onUnhover()` | Register a callback function for `mouseout` event on all specified hoverables. |

Each event callback will overwrite it's related event method from the initial options object.
