let listaNombresGastos = [];  //DEFINE UN ARRAY INICIALIZADO EN VACIO (EN JS ARREGLO Y LISTA SON LO MISMO)
let listaDescripcionesGastos = [];
let listaValoresGastos = [];
let indiceLista = -1;
const elementoNombreGasto = document.getElementById('nombreGasto');
const elementoDescripcionGasto = document.getElementById('descripcionGasto');
const elementoValorGasto = document.getElementById('valorGasto');
const elementobotonFormulario = document.getElementById('botonFormulario');

function clickRegistrar() {
    let nombreGasto = elementoNombreGasto.value;
    if (validaInconsistencia(nombreGasto)) {
        alert('Debe ingresar el Nombre del Gasto');
        elementoNombreGasto.focus();
        return;
    }

    let descripcionGasto = elementoDescripcionGasto.value;
    if (validaInconsistencia(descripcionGasto)) {
        alert('Debe ingresar la Descripción del Gasto');
        elementoDescripcionGasto.focus();
        return;
    }

    let valorGasto = elementoValorGasto.value;
    if (validaInconsistencia(valorGasto)) {
        alert('Debe ingresar el Valor del Gasto');
        elementoValorGasto.focus();
        return;
    }  

    if (valorGasto > 150) {
        alert('¡Cuide su presupuesto!, ha registrado un gasto mayor a 150 Dólares');
    }

    if (indiceLista !== -1) {
        listaNombresGastos[indiceLista] = nombreGasto;
        listaDescripcionesGastos[indiceLista] = descripcionGasto;
        listaValoresGastos[indiceLista] = valorGasto;
        indiceLista = -1;
        elementobotonFormulario.innerHTML = 'Agregar Gasto';
    } else {
        listaNombresGastos.push(nombreGasto);  //CON 'push' SE AGREGA UN ELEMENTO AL ARRAY
        listaDescripcionesGastos.push(descripcionGasto);
        listaValoresGastos.push(valorGasto);
    }    
    actualizarListaGastos();
}

function actualizarListaGastos() {
    let htmlLista = '';
    let totalGastos = 0;
    const listaElementos = document.getElementById('listaDeGastos');
    const htmltotalGastos = document.getElementById('totalGastos');

    /* 'elemento' y 'posicion' PODEMOS PONERLE CUALQUIER OTRO NOMBRE QUE DEFINAMOS, PERO SIEMPRE EL PRIMERO HARÁ
       REFERENCIA AL ELEMENTO DE ITERACION DE LA LISTA Y EL SEGUNDO A LA POSICION DE ESTE ELEMENTO */
    listaNombresGastos.forEach((elemento, posicion) => {
        //LO CONVIERTE DE 'String' a 'Number' (QUE CONSIDERA HASTA DECIMALES)
        let listaGasto = Number(listaValoresGastos[posicion]);

        let listaDescripcionGasto = listaDescripcionesGastos[posicion];

        //htmlLista += "<li>" + elemento + "</li>";
        //USANDO LISTA NO ORDENADA - TEMPLATE STRING SE USA PARA EVITAR EL CONCATENAR CON '+'       
        /*htmlLista += `<li>${elemento} - ${listaDescripcionGasto} - USD ${listaGasto.toFixed(2)}
                    <button onclick="eliminar(${posicion});">Eliminar</button>
                    <button onclick="actualizar(${posicion});">Editar</button></li>`;*/

        //USANDO TABLA - TEMPLATE STRING SE USA PARA EVITAR EL CONCATENAR CON '+'            
        htmlLista += `<tr><td>${elemento}</td><td>${listaDescripcionGasto}</td><td>USD ${listaGasto.toFixed(2)}</td>
                    <td><button onclick="eliminar(${posicion});">Eliminar</button></td>
                    <td><button onclick="actualizar(${posicion});">Editar</button></td></tr>`;               
        totalGastos += listaGasto;
    });
    listaElementos.innerHTML = htmlLista;  //'innerHTML' ASIGNA CONTENIDO A LA PAGINA HTML DE FORMA DINAMICA
    htmltotalGastos.innerHTML = totalGastos.toFixed(2);  //'toFixed(2)' DEFINE SE TRABAJE SOLO CON 2 DECIMALES
    limpiar();
}

function limpiar() {
    elementoNombreGasto.value = '';
    elementoDescripcionGasto.value = '';
    elementoValorGasto.value = '';
    elementoNombreGasto.focus();
}

function eliminar(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function actualizar(posicion) {
    limpiar();
    indiceLista = posicion;
    elementoNombreGasto.value = listaNombresGastos[posicion];
    elementoDescripcionGasto.value = listaDescripcionesGastos[posicion];
    elementoValorGasto.value = listaValoresGastos[posicion];
    elementobotonFormulario.innerHTML = 'Actualizar Gasto';
}

function validaInconsistencia(valor) {
    if (typeof valor === 'String') {
        if (valor === null || valor === undefined || valor.trim() === '') {
            return true;
        }
    }    
    else {
        if (!valor || valor <= 0) {
            return true;
        }    
    }
    return false;       
}