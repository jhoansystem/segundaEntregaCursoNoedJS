const express = require('express')
const app = express()
const path=require('path')
const hbs=require('hbs')
const bodyParser=require('body-parser')
require('./helpers');
const cursos=require('./cursos');
const cursosInscripcion=require('./cursosInscripcion');



const directoriopublico=path.join(__dirname,'../public');
const directoriopartials=path.join(__dirname,'../partials');
hbs.registerPartials(directoriopartials);
app.use(express.static(directoriopublico));
app.use(bodyParser.urlencoded({extended:false}));


app.set('view engine','hbs')


/*
	* PETICIONES POST
*/
app.post('/crearCursos',(req,res)=>{
	
	let Mensaje='';
	
	if(req.body.id=='' || req.body.nombreCompleto=='' || req.body.descripcion=='' || req.body.valor=='')
	{
		Mensaje='<script>alert("El Id, nombre completo, descripcion y el valor son obligatorios")</script>';
	}
	else
	{
		curso={
				id:req.body.id,
				nombreCompleto:req.body.nombreCompleto,
				descripcion:req.body.descripcion,
				valor:req.body.valor,
				modalidad:req.body.modalidad,
				intensidadHoraria:req.body.intensidadHoraria,
				estado:'disponible'
			}
		Mensaje=cursos.crear(curso);
	}
	/*res.send(Mensaje);*/
	res.render('crearCursos',{cursosMesaje:Mensaje});
})
app.post('/cursoInscripcion',(req,res)=>{
	
	let Mensaje='';
	
	if(req.body.idCurso=='' || req.body.documento=='' || req.body.nombreCompleto=='' || req.body.correo=='' || req.body.telefono=='')
	{
		Mensaje='<script>alert("El Id del curso, documento, nombre completo, correo y el teléfono son obligatorios")</script>';
	}
	else
	{
		cursoEstudiante={
				idCurso:req.body.idCurso,
				documento:req.body.documento,
				nombreCompleto:req.body.nombreCompleto,
				correo:req.body.correo,
				telefono:req.body.telefono
			}
		Mensaje=cursosInscripcion.crear(cursoEstudiante);
	}
	idCurso=req.query.idCurso;
	/*res.send(Mensaje);*/
	res.render('cursoInscripcion',{cursosMesaje:Mensaje,idCurso:idCurso});
})
/*
	* PETICIONES GET
*/
app.get('/',(req,res)=>{

	res.render('index')
})
app.get('/crearCursos',(req,res)=>{
	res.render('crearCursos',{cursosDisponibles:''})
})
app.get('/cursosDisponibles',(req,res)=>{
	listaCursosDisponibles=cursos.mostrarCusrosDisponibles();
	res.render('cursosDisponibles',{cursosDisponibles:listaCursosDisponibles})
})
app.get('/cursoInscripcion',(req,res)=>{
	idCurso=req.query.idCurso;
	selectCursos=cursosInscripcion.cargarListaCursos(req.query.idCurso);
	console.log(selectCursos)
	res.render('cursoInscripcion',{selectCursos:selectCursos,idCurso:idCurso})
})
app.get('/verInscritos',(req,res)=>{
	listaInscritos=cursosInscripcion.mostrarListaInscritos();
	res.render('verInscritos',{listaInscritos:listaInscritos})
})

app.get('/cerrarCurso',(req,res)=>{
	
	Mensaje=cursosInscripcion.cerrarCurso(req.query.id)
	listaInscritos=cursosInscripcion.mostrarListaInscritos();
	res.render('verInscritos',{listaInscritos:listaInscritos,cursosMesaje:Mensaje});
})

app.get('/eliminarIncripcion',(req,res)=>{

	Mensaje=cursosInscripcion.eliminarInscripcion(req.query.documento,req.query.idCurso)
	listaInscritos=cursosInscripcion.mostrarListaInscritos();
	res.render('verInscritos',{listaInscritos:listaInscritos,cursosMesaje:Mensaje});
	/*res.writeHead(301,
	  {Location: '/verInscritos'}
	);
	res.end();*/
})

app.get('*',(req,res)=>{
	res.render('error',{estudiante:'Error'})
})


/*
	 * SUBIR EL SERVICIO
*/
app.listen(3000, ()=>{
	console.log('Escuchando en el puerto 3000')
})

