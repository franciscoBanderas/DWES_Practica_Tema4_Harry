$(document).ready(function () {
    let tablaHTML = "";
    $('#Todos').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:8080/filtrar',
            method: 'GET',
            data: {},
            success: function (respuestaJSON) { 
                let contenido = JSON.parse(respuestaJSON);
                tablaHTML = crearTabla(contenido);
                $("#contenido").html(tablaHTML);
            }
        })
    });
    $('#humanos').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:8080/humanos',
            method: 'GET',
            success: function (respuestaJSON) {
                let contenido = JSON.parse(respuestaJSON);
                tablaHTML = crearTabla(contenido);
                $("#contenido").html(tablaHTML);
            }
        })
    });
    $('#fecha').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:8080/fecha',
            method: 'GET',
            success: function (respuestaJSON) {  
                let contenido = JSON.parse(respuestaJSON);
                tablaHTML = crearTabla(contenido);
                $("#contenido").html(tablaHTML);
            }
        })
    });$('#vivos').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:8080/vivos',
            method: 'GET',
            success: function (respuestaJSON) {
                let contenido = JSON.parse(respuestaJSON);
                tablaHTML = crearTabla(contenido);
                $("#contenido").html(tablaHTML);
            }
        })
    });
    $('#madera').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://127.0.0.1:8080/madera',
            method: 'GET',
            success: function (respuestaJSON) {
                let contenido = JSON.parse(respuestaJSON);
                tablaHTML = crearTabla(contenido);
                $("#contenido").html(tablaHTML);
            }
        })
    });  
});
function crearTabla(contenido) {
let res = '<table class="table">';
    res += '<thead><tr><th scope="col">Imagen</th><th scope="col">Nombre</th><th scope="col">Especie</th><th scope="col">Genero</th><th scope="col">Casa</th><th scope="col">Año de Nacimiento</th></tr></thead><tbody>';
    $.each(contenido, function () {
        let nombre= this.name;
        let imagen= this.image;
        let especie = this.species;
        let genero = this.gender;
        let house = this.house;
       let dateOfBirth = this.dateOfBirth;
        res += `<tr><td><img src="${imagen}" height="250" with="250"></img></td><td>${nombre}</td><td>${especie}</td><td>${genero}</td><td>${house}</td><td>${dateOfBirth}</td></tr>`
    })
    res += '</body></table>';
    return res;
}