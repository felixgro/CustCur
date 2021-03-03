const createNodesWithClasses = (classes, tag = 'div', parent = document.body) => {
	classes.forEach(c => {
		const el = document.createElement(tag)
		el.className = c
		parent.appendChild(el)
	})

	return classes.map(c => `.${c}`)
}

module.exports = {
	createNodesWithClasses
}