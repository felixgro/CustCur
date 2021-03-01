# CustCur

A lightweight, highly customizable custom cursor framework for the web.

## Installation & Usage
1. Install using npm:
```
npm i custcur --save
```

2. Initialize a custom cursor with default options:

```javascript
import CustCur from 'custcur';
// or..
const CustCur = require('custcur');

const cursor = new CustCur({});
```

## Customization
You can pass an options object as a parameter to CustCur's constructor to overwrite default settings:
```javascript
new CustCur({
 // options here..
})
```

### Available Options
| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `target` | Node | Target Element for custom cursor. | `window` |
| `hoverables` | Array | Array of css-selectors or node elements within the specified target that should trigger the cursor's hover state. | `['a', 'button']` |
| `hideDefaultCursor` | Boolean | Determine if the system's default cursor should be hidden. | `true` |
| `onEnter` | Method | Listen for `mouseover` event on specified target. | `(e)=>{}` |
| `onLeave` | Method | Listen for `mouseout` event on specified target. | `(e)=>{}` |
| `onMove` | Method | Listen for `mousemove` event on specified target. | `(e)=>{}` |
| `onClick` | Method | Listen for `mousedown` event within specified target. | `(e)=>{}` |
| `onClickRelease` | Method | Listen for `mouseup` event within specified target. | `(e)=>{}` |
| `onHover` | Method | Listen for `mouseover` event on all specified hoverables. | `(e)=>{}` |
| `onUnhover` | Method | Listen for `mouseout` event on all specified hoverables. | `(e)=>{}` |
| `cursor.el` | Node? | HTML Element for custom cursor. If property is `null` custcur will create a `div` element with the specified classname. | `null` |
| `cursor.class` | String | Specifies the cursor's classname. |`'cc-cursor'` |
| `cursor.hoverClass` | String | Specifies a classname for the cursor's hover state. | `'cc-hover'` |
| `cursor.clickClass` | String | Specifies a classname for the cursor's click state.  | `'cc-click'` |

<small align="right">...? Property can be of type `null`. </small>

### Available Methods
| Method | Description |
| --- | --- |
| `cursor.enable()` | enable custom cursor at runtime. |
| `cursor.disable()` | disable custom cursor at runtime. |

