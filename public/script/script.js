document.querySelector('.github').onclick = () => {
	window.open('https://github.com/LinoMota', '_blank')
}

document.querySelector('.linkedin').onclick = () => {
	window.open('https://www.linkedin.com/in/lino-mota-494005197/', '_blank')
}

document.querySelector('.instagram').onclick = () => {
	window.open('https://www.instagram.com/lino.mota', '_blank')
}

document.querySelector('.email').onclick = () => {
	location.href = 'mailto:linomotadev@gmail.com'
}

function setVisibleClass(element, _class) {
	element.style.opacity = (!element.classList.contains(_class)) ? "0" : "1"
	element.style.display = (!element.classList.contains(_class)) ? "none" : ""
}

document.querySelectorAll('.tabs a').forEach((tab, i) => {

	let itemClass = ['backend', 'web', 'tool']

	tab.onclick = () => {
		let xpItems = document.querySelectorAll('.xp-item')
		xpItems.forEach((item) => {
			setVisibleClass(item, itemClass[i])
		})
	}

	tab.onkeydown = (e) => {
		if (e.keyCode == 13)
			tab.click()
	}
})

function loadJsonFile(filePath) {

	return new Promise((resolve, reject) => {
		fetch(filePath).then(res => {
			resolve(res.json())
		})
	})

}

function insertItems(jsonArray) {
	let listDiv = document.querySelector('.item-list');
	jsonArray.forEach(item => {
		let {
			type,
			svgImage,
			title,
			desc
		} = item
		listDiv.innerHTML += `<div class="xp-item ${type}">\
								<div class="xp-image"><img src="./public/img/expIcons/${svgImage}"></div>\
								<div class="xp-title">${title}</div>\
								<div class="xp-desc">${desc}</div>\
							</div>`;
	})
}

Promise.all([
	loadJsonFile('../public/data/toolList.json'),
	loadJsonFile('../public/data/webExp.json'),
	loadJsonFile('./public/data/backendExp.json')
]).then(responses => {
	console.log(responses)
	responses.forEach(data => {
		insertItems(data)
	})
	document.querySelectorAll('.tabs a')[0].click()
})