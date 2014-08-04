function aleatorio(min, max) {
	return min + Math.floor(5 + Math.random() * (max - min + 1));
}

function escreveTexto(context, texto) {
	context.fillStyle = 'white';
	context.strokeStyle = 'black';
	context.font = '50px sans-serif';
	context.fillText(texto, 160, 200);
	context.strokeText(texto, 160, 200);
}