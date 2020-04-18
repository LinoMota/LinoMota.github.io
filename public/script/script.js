
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
	element.style.opacity = (!element.classList.contains(_class)) ? "0" : "1";
	element.style.display = (!element.classList.contains(_class)) ? "none" : "";
}

let tabs = document.querySelectorAll('.tabs a')

let itemClass = ['backend','web','tool']

tabs.forEach( (tab,i) => {
	tab.onclick = () => {
		
		let xpItems = document.querySelectorAll('.xp-item')

		xpItems.forEach( (item) => {
			setVisibleClass(item,itemClass[i]) 
		})
	}
})

//test
let toolList = [
	{
		svgImage : "figma.svg",
		type : "tool",
		title : "Figma",
		desc : "Minha ferramenta para prototipagem favorita, ótima quando se trata de organização e simulação das telas criadas, desde que conheci Figma sempre busco criar a ideia dentro da ferramenta antes de começar na  programar de fato."
	},
	{
		svgImage : "slack.svg",
		type : "tool",
		title : "Slack",
		desc : "Uma das melhores e mais ultilizadas ferramentas para comunicação para times de desenvolvimento, sempre ultilizo a mesma quando organizam algum projeto."
	},
	{
		svgImage : "discord.svg",
		type : "tool",
		title : "Discord",
		desc : "Discord é a minha plataforma favorita de comunicação ótimo site para conversar com os amigos via chat e voz, realizar livestream em servidores privados e publicos."
	}
]

let backendList = [
	{
		svgImage : "java.svg",
		type : "backend",
		title : "Java",
		desc : "Uma das minhas primeiras linguagens de programação, hoje Java está meio ofuscado no mercado por outras mais populares, porém em termo de aplicações industriais ainda está firme e forte."
	},
	{
		svgImage : "python.svg",
		type : "backend",
		title : "Python 3/2",
		desc : "Python a intuitiva linguaguem que me proporcionou dias de diversão, automatizando tarefas, simplificando processos e encurtando códigos, sua natureza dinâmica e facilidade de escrita torna fácil realizar seja a tarefa que for em seu ambiente. "
	},
	{
		svgImage : "lua.svg",
		type : "backend",
		title : "Lua",
		desc : "Aprendi Lua durante um curso que fiz, poderosa e portavel linguagem brasileira sua simplicidade me lembra muito python, porém tem coisas que Lua se mostra mais leve. Possui muitos fãs ao redor do mundo que criam desde simples módulos até engine para jogos. É programador brasileiro e não conhece Lua? Poser! :)"
	},
	{
		svgImage : "c++.svg",
		type : "backend",
		title : "C & C++",
		desc : "De longe minhas duas linguagens favoritas, desde que tive o primeiro contato na universidade essas duas verdadeiras armas de guerra se juntaram ao meu arsenal, foi por elas que me interessei em baixo nível a ponto de trabalhar com algumas dezenas de megas e implementar algoritmos em placas de prototipagem com Arduino."
	},
	{
		svgImage : "bash.svg",
		type : "backend",
		title : "Bash Programming",
		desc : "Comecei a aprender quando senti a necessidade de acelerar a configuração do meu ambiente, coisas como executar uma série específicas de passos e a possibilidade de executar comandos do unix nesse passos me deu poder para fazer simples interfaces que preparavam a aplicação para outros computadores."
	},
	{
		svgImage : "sql.svg",
		type : "backend",
		title : "SQL",
		desc : "Quando iniciei desenvolvimento web foi uma das necessidades, tive experiência com Oracle, Sqlite e MySql. A quantidade de dados que tive que trabalhar foi alguns milhares e não foi muito divertido no começo, porém agora já estou mais adaptado com esse tipo de situação."
	},
	{
		svgImage : "assembly.svg",
		type : "backend",
		title : "Assembly Language MIPS",
		desc : "Assembly foi uma descoberta na universidade que me despertou interesse para portar alguns algoritmos conhecidos para a mesma, inicialmente foi desafiante ter que usar recursos limitados, mas depois se percebe que não é algo tão difícil quanto parece."
	}
]

let webList = [
	{
		svgImage : "js.svg",
		type : "web",
		title : "JavaScript ECMAScript 6",
		desc : "Sólido conhecimento JavaScript pois desde que iniciou desenvolvimento web era sua principal ferramenta para validações de formulários, geração de gráficos via canvas e controle de gatilhos de eventos para animações."
	},
	{
		svgImage : "css.svg",
		type : "web",
		title : "Css3 Cascading Style Sheets",
		desc : "Css foi uma das descobertas mais divertidas, sempre buscou conhecer mais de seu comportamento e hoje Css está mais poderosa do que nunca. Com certeza uma das melhores partes de um projeto é a sua cara, logo Css é a ferramenta certa para o serviço. Esse site por exemplo :D css puro ! "
	},
	{
		svgImage : "html.svg",
		type : "web",
		title : "HTML Hypertext Markup Language",
		desc : "Essêncialmente esqueleto de qualquer site, grande possibilidades de manipulação e atualmente recebeu ótimas tags que junto ao JavaScript se mostram interessantes de serem ultilizadas."
	},
	{
		svgImage : "php.svg",
		type : "web",
		title : "PHP Personal Home Page",
		desc : "Minha primeira linguagem server side de fato, consegui fazer muita coisa em bastante pouco tempo com PHP, de fato uma poderosa e simples linguagem que ainda hoje possui muito á mostrar sobre outras presente no mercado."
	},
	{
		svgImage : "node.svg",
		type : "web",
		title : "Node.js The Server Side JavaScript",
		desc : "Experiência com projetos mais pessoais com Node.js, ótima adaptação do JavaScript para server side, bastante pessoas na comunidade, muitos pacotes para ultilizar via npm além de uma grande portabilidade."
	},
	{
		svgImage : "react.svg",
		type : "web",
		title : "React",
		desc : "Uma das melhores tecnologias que já ultilizei para fazer frontent, sua componentização transforma tudo em algo mais modular, sempre bem estruturado e possiblitando uma melhor leitura de código, devido a quantidade de arquivos e composição de interface."
	}
]

let listDiv = document.querySelector('.item-list');

webList.forEach( (item) => {
	listDiv.innerHTML += '<div class="xp-item '+item.type+'">\
							<div class="xp-image"><img src="./img/expIcons/'+item.svgImage+'"></div>\
							<div class="xp-title">'+item.title+'</div>\
							<div class="xp-desc">'+item.desc+'</div>\
						</div>' ;
})


toolList.forEach( (item) => {
	listDiv.innerHTML += '<div class="xp-item '+item.type+'">\
							<div class="xp-image"><img src="./img/expIcons/'+item.svgImage+'"></div>\
							<div class="xp-title">'+item.title+'</div>\
							<div class="xp-desc">'+item.desc+'</div>\
						</div>' ;
})


backendList.forEach( (item) => {
	listDiv.innerHTML += '<div class="xp-item '+item.type+'">\
							<div class="xp-image"><img src="./img/expIcons/'+item.svgImage+'"></div>\
							<div class="xp-title">'+item.title+'</div>\
							<div class="xp-desc">'+item.desc+'</div>\
						</div>' ;
})

tabs[1].click()