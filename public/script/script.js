
document.querySelector('.github').onclick = () => {
	window.open('https://github.com/LinoMota','_blank')
}

document.querySelector('.linkedin').onclick = () => {
	window.open('https://www.linkedin.com/in/lino-mota-494005197/','_blank')
}

document.querySelector('.instagram').onclick = () => {
	window.open('https://www.instagram.com/lino.mota','_blank')
}

document.querySelector('.email').onclick = () => {
	location.href = 'mailto:linomotadev@gmail.com'
}



function setVisibleClass(element,_class){
	element.style.opacity = (!element.classList.contains(_class)) ? "0" : "1"
	element.style.display = (!element.classList.contains(_class)) ? "none" : ""
}

let tabs = document.querySelectorAll('.tabs a')

let itemClass = ['backend','web','tool']

tabs.forEach( (tab,i) => {

	tab.onclick = () => {
		let xpItems = document.querySelectorAll('.xp-item')
		xpItems.forEach((item) => {
			setVisibleClass(item, itemClass[i])
		})
	}

	tab.onkeydown = (e) =>{
		if(e.keyCode == 13)
			tab.click()
	}
})

function loadJsonFile(filePath, callback){

	fetch(filePath).then( res => {
		res.json().then( data => {
			callback(data)
		})
	})
	
}

function instertItems(jsonArray){
	let listDiv = document.querySelector('.item-list');
	jsonArray.forEach( (item) => {
		listDiv.innerHTML += '<div class="xp-item '+item.type+'">\
								<div class="xp-image"><img src="./public/img/expIcons/'+item.svgImage+'"></div>\
								<div class="xp-title">'+item.title+'</div>\
								<div class="xp-desc">'+item.desc+'</div>\
							</div>' ;
	})
}

loadJsonFile('./public/data/backendExp.json',instertItems)
loadJsonFile('../public/data/toolList.json',instertItems)
loadJsonFile('../public/data/webExp.json',instertItems)

tabs[1].click()