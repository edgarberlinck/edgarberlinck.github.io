/*
	Utilitario para o carregamento de recursos.

	06/08/2014- edgarberlinck: Criação
 */

var audioFiles = {
	explosao : 'explosao.mp3',
	musicaAcao : 'musica-acao.mp3',
	musicaIntro: 'musica-intro.wav',
	musicaPause: 'musica-pause.wav',
	tiro: 'tiro.mp3'
}

var generalImageFiles = {
	explosao: 'explosao.png',
	fundoEspaco: 'fundo-espaco.png',
	fundoEstrelas: 'fundo-estrelas.png',
	fundoNuvens: 'fundo-nuvens.png',
}

var imageStarshipFiles = {
	defaultStarship: 'nave-spritesheet.png'
}

var imageEnemies = {
	ovni: 'ovni.png'
}

// quantidade total de elementos a ser carregada
/*FIXME: tentar fazer com que este atributo fique com o tamanho dinâmico com base na quatidade
  de elementos dos objetos deste arquivo. */
var	elementsToLoad = 11; 
