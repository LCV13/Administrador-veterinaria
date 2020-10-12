//1
const mascotaInput = document.getElementById('mascota');
const propietarioInput = document.getElementById('propietario');
const telefonoInput = document.getElementById('telefono');
const fechaInput = document.getElementById('fecha');
const horaInput = document.getElementById('hora');
const sintomasInput = document.getElementById('sintomas');

const formulario = document.getElementById('nueva-cita');
const contenedorCitas = document.getElementById('citas');

//26 - Modo edicion
let editando;

//5
class Citas{
    constructor(){
        this.citas = [];
    }

    //13
    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    //20
    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    //29
    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }
}

//6
class UI{
//10
    imprimirAlerta(mensaje, tipo){
        //Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //agregar clase en base a tipo error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar la alerta despues de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas({citas}){//destructuring desde el parametro. es igual a hacer {citas} = citas;
    this.limpiarHTML();
    
    citas.forEach(cita =>{
        const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

        const divCita = document.createElement('div');
        divCita.classList.add('cita', 'p-3');
        divCita.dataset.id = id;


        //Scripting de los elementos de la cita
        const mascotaParrafo = document.createElement('h2');
        mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
        mascotaParrafo.textContent = mascota;


        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML = 
        `<span class="font-weight-bolder">Propietario: </span>`+ propietario
        ;

        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Telefono: </span> `+ telefono
       ;

        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha: </span>` + fecha
        ;


        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora: </span>`+ hora
      ;


        const sintomasParrafo = document.createElement('p');
        sintomasParrafo.innerHTML = `
        <span class="font-weight-bolder">Sintomas: </span> ` + sintomas
       ;


        //18 - Boton para eliminar citas
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
        btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

        btnEliminar.onclick = () => eliminarCita(id);


        //24- Añadir un boton para editar
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-info');
        btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>';

        btnEditar.onclick = ()=> cargarEdicion(cita);

        //Agregar los parrafos al div de cita
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);


        //Agregar citas al html
        contenedorCitas.appendChild(divCita);
    });
    }

   limpiarHTML(){
       while(contenedorCitas.firstChild){
           contenedorCitas.removeChild(contenedorCitas.firstChild);
       }
   }
}


//7
const ui = new UI();
const administrarCitas =  new Citas();




//2
eventListeners();

function eventListeners(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    //8
    formulario.addEventListener('submit', nuevaCita);
}

//3
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha:'',
    hora:'',
    sintomas:''
}




//4
function datosCita(e){
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}

//9 - valida y agrega una nueva cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();

    //Extraer la informacion del objeto de citas
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || hora === '' || sintomas === ''){

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;//para que no se ejecute la siguiente linea
    }

    //28
    if(editando){
        ui.imprimirAlerta('Editado correctamente');

        //pasar el objeto de la cita a edición
        administrarCitas.editarCita({...citaObj});

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //deshabilitar el modo edicion
        editando = false;

    }else{
            //12 generar un id
            citaObj.id = Date.now();

            //11 Agregar nueva cita
            administrarCitas.agregarCita({...citaObj});//toma una copia del objeto generado anteriormente y agrega otro objeto con nuevos valores ingresados

            //Mensaje de agregado correctamente
            ui.imprimirAlerta('Cita agregada correctamente');
    }


    //16 reiniciar el objeto para validacion
    reiniciarObjeto();

    //14
    formulario.reset();

    //17 Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);

}

//15

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}


//19
function eliminarCita(id){
    //21- Eliminar cita
    administrarCitas.eliminarCita(id);

    //22- Mostrar mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //23- Refrescar las citas
    ui.imprimirCitas(administrarCitas);

}


//25- Cargar los datos y el modo edición
function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    //Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;



    //Cammbiar el texto del boton 'Crear Cita'
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    //29 - Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //27
    editando = true;
}