const hbs=require('hbs')
hbs.registerHelper('obtenerpromedio',(nota1,nota2,nota3)=> {
	return (nota1+nota2+nota3)/3
})


hbs.registerHelper('listar',(nota1,nota2,nota3)=> {
	try{
	listaEstudiante = require('./listado.json');
	}
	catch{
		listaEstudiante =[];
	}
	let texto= 'Lista de estudiante<br>'
	listaEstudiante.forEach(estudiante =>{
		texto=texto + 
				'Nombre ' + estudiante.nombre + '<br>' +
				'notas ' +
				'matematicas ' + estudiante.matematicas + '<br>'+
				'ingles ' + estudiante.ingles + '<br>'+
				'programacion ' + estudiante.ingles + '<br><br>'
	})
	return texto;
})

