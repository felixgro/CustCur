/**
 * Initialize a custom cursor.
 *
 * @param {*} options
 */
const CustCur = (options) => {
	window.onmousemove = e => {
		console.dir(e);
	}
}

module.exports.CustCur = CustCur;