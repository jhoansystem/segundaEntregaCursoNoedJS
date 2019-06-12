const fs = require('fs');

listaCurso =[];

const crear =(curso) => {
	listar();
	let nuevoCurso ={
		id:curso.id,
		nombreCompleto:curso.nombreCompleto,
		descripcion:curso.descripcion,
		valor:curso.valor,
		modalidad:curso.modalidad,
		intensidadHoraria:curso.intensidadHoraria,
		estado:curso.estado
	};
	let duplicado = listaCurso.find(ids => ids.id == curso.id);
	if(!duplicado)
	{
		listaCurso.push(nuevoCurso);
		guardar();
		return '<script>alert("Curso guardado")</script>';
	}
	else
	{
		return '<script>alert("Ya existe un curso con ese id")</script>';
	}
}
const guardar =() => {
	let datos = JSON.stringify(listaCurso);
	fs.writeFile('listadoCursos.json',datos,(error)=>{
		if(error) throw (error);

	});
}


const listar =() =>{
	try{
		listaCurso =JSON.parse(fs.readFileSync('./listadoCursos.json'))
		//listaCurso = require('../listadoCursos.json');
	}
	catch{
		listaCurso =[];
	}
	//listaCurso = JSON.stringify(fs.readFileSync('./listado.json'));

}

const mostrarCusrosDisponibles=()=>{
	listar();
	/*
	let listaCursosDisponibles=`<table style="width:100%" border='1'>
	  <tr>
		<th>Id</th>
		<th>Nombre completo</th> 
		<th>Descripción</th>
		<th>Valor</th>
		<th>Modalidad</th>
		<th>Intensidad horaria</th>
		<th>Estado</th>
	  </tr>`;*/
	 let listaCursosDisponibles=`<table style="width:100%" border='1'>
	  <tr>
		<th></th>
		<th></th>
		<th>Nombre curso</th> 
		<th>Descripción</th>
		<th>Valor</th>
	  </tr>`;
	listaCurso.forEach(curso =>{
		if(curso.estado=='disponible')
		{
			/*listaCursosDisponibles=listaCursosDisponibles+`
									  <tr>
										<th>`+curso.id+`</th>
										<th>`+curso.nombreCompleto+`</th> 
										<th>`+curso.descripcion+`</th>
										<th>`+curso.valor+`</th>
										<th>`+curso.modalidad+`</th>
										<th>`+curso.intensidadHoraria+`</th>
										<th>`+curso.estado+`</th>
									  </tr>`;*/
			listaCursosDisponibles=listaCursosDisponibles+`
									  <tr>
										<td><a href="" onclick="alert(' Id: `+curso.id+` \\n Curso: `+curso.nombreCompleto +` \\n Descripción: `+curso.descripcion+`\\n Valor: `+ curso.valor+` \\n modavlidad: ` +curso.modalidad+`')">Ver detalles</a></td>
										<td><a href="/cursoInscripcion?idCurso=`+curso.id+`">Inscribirme</a></td>
										<td>`+curso.nombreCompleto+`</td> 
										<td>`+curso.descripcion+`</td>
										<td>`+curso.valor+`</td>
									  </tr>`;
		}
								  
	})
	listaCursosDisponibles=listaCursosDisponibles+`</table>`;
	
	return listaCursosDisponibles;
}


module.exports={
	crear,
	mostrarCusrosDisponibles,
}; 