const fs = require('fs');

listaCursoEstudiantes =[];

const crear =(cursoEstudiante) => {
	listar();
	let nuevoCurso ={
		idCurso:cursoEstudiante.idCurso,
		documento:cursoEstudiante.documento,
		nombreCompleto:cursoEstudiante.nombreCompleto,
		correo:cursoEstudiante.correo,
		telefono:cursoEstudiante.telefono
	};
	let documentoEstudiante=cursoEstudiante.documento;
	let idCursoEstudiante=cursoEstudiante.documento;
	let contador=0;
	
	listaCursoEstudiantes.forEach(cursoEstudianteItem =>{
		if(cursoEstudianteItem.documento==documentoEstudiante && cursoEstudianteItem.idCurso==idCursoEstudiante)
		{
			contador=contador+1;
		}					  
	})
	
	if(contador<2)
	{
		listaCursoEstudiantes.push(nuevoCurso);
		guardar();
		return '<script>alert("Inscripción exitosa")</script>';
	}
	else
	{
		return '<script>alert("Ya se inscribío en este curso dos veces")</script>';
	}
}
const guardar =() => {
	let datos = JSON.stringify(listaCursoEstudiantes);
	fs.writeFile('listadoCursosEstudiantes.json',datos,(error)=>{
		if(error) throw (error);
		/*console.log('Archivio Creado con exito');*/

	});
}


const listar =() =>{

	try{
		listaCursoEstudiantes =JSON.parse(fs.readFileSync('./listadoCursosEstudiantes.json'))
	}
	catch{
		listaCursoEstudiantes =[];
	}

	try{
		listaCurso =JSON.parse(fs.readFileSync('./listadoCursos.json'))
	}
	catch{
		listaCurso =[];
	}
}

const mostrarListaInscritos=()=>{
	listar();

	 let listaInscritos=`<table style="width:100%" border='1'>
	  <tr>
		<th>Nombre curso</th> 
		<th>Descripción</th>
		<th>Valor</th>
		<th></th>
		<th></th>
	  </tr>`;
	listaCurso.forEach(curso =>{
			
			if(curso.estado=='disponible' )
			{
				listaInscritos=listaInscritos+`<tr>
												<td>`+curso.nombreCompleto+`</td> 
												<td>`+curso.descripcion+`</td>
												<td>`+curso.valor+`</td>
												<td><a href="/cerrarCurso?id=`+curso.id+`">Cerrar curso</a></td>
											  <td> `
				let existeCurso='N';
				listaCursoEstudiantes.forEach(cursoEstudiante =>{
							if(cursoEstudiante.idCurso==curso.id)
							{
								existeCurso='S'
							}
						
					})	
				if(existeCurso=='S')
				{
					listaInscritos=listaInscritos+`<table style="width:100%;padding:20px;" border='1'> 
													  <tr>
															<th>Documento</th> 
															<th>Nombre completo</th> 
															<th>Correo</th>
															<th>Teléfono</th>
															<th>Eliminar</th>
													  </tr>`

				}
				listaCursoEstudiantes.forEach(cursoEstudiante =>{
					
					
							if(cursoEstudiante.idCurso==curso.id)
							{
								
								listaInscritos=listaInscritos+`
														  <tr>
															<td>`+cursoEstudiante.documento+`</td>
															<td>`+cursoEstudiante.nombreCompleto+`</td> 
															<td>`+cursoEstudiante.correo+`</td>
															<td>`+cursoEstudiante.telefono+`</td>
															<td><a href="eliminarIncripcion?documento=`+cursoEstudiante.documento+`&idCurso=`+cursoEstudiante.idCurso+`">Eliminar aspirante</a></td>
														  </tr>`;
							}
						
					})	
				if(existeCurso=='S')
				{
				listaInscritos=listaInscritos+`</table>`;
											  
				}
				listaInscritos=listaInscritos+` </td></tr>`;
			}		
	})
	listaInscritos=listaInscritos+`</table>`;
	
	return listaInscritos;
}
const cerrarCurso=(id)=>{
	listar();

	listaCurso2=[];
	

	listaCurso.forEach(curso =>{
			
			if(curso.id==id)
			{
				curso['estado']='cerrado';
			}
			listaCurso2.push(curso)
			
	});
	let datos=JSON.stringify(listaCurso2);
				fs.writeFile('listadoCursos.json',datos,(error)=>{
					if(error) throw (error);
					});
	return '<script>alert("Curso cerrado exitosamente");window.location="/verInscritos"</script>';
}
const eliminarInscripcion=(documento,idCurso)=>{
	listar();

	listaCursoEstudiantes2=[];
	

	listaCursoEstudiantes.forEach(estudianteInscripcion =>{
			
			if(estudianteInscripcion.documento!=documento & estudianteInscripcion.idCurso!=idCurso)
			{
				listaCursoEstudiantes2.push(estudianteInscripcion)
			}
		
			
	});

	let datos = JSON.stringify(listaCursoEstudiantes2);
		fs.writeFile('listadoCursosEstudiantes.json',datos,(error)=>{
			if(error) throw (error);
		});
	return '<script>alert("Aspirante eliminado existosamente");window.location="/verInscritos"</script>';
}
const cargarListaCursos=(idCurso)=>{
	listar();
	let selectCursos='<select name="idCurso"><option></option>'
	console.log(listaCurso);
	listaCurso.forEach(curso =>{
			 if(curso.id==idCurso)
			 {
			 	selectCursos=selectCursos+`<option selected value="`+curso.id+`">`+curso.nombreCompleto+`</option>`;
			 }
			 else
			 {
			 	selectCursos=selectCursos+`<option value="`+curso.id+`">`+curso.nombreCompleto+`</option>`;
			 }
			
	});
	selectCursos=selectCursos+'</select>';
	return selectCursos
}

module.exports={
	crear,
	mostrarListaInscritos,
	cerrarCurso,
	eliminarInscripcion,
	cargarListaCursos
}; 