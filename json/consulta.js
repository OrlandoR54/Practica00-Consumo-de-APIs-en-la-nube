/*Funcion Para obtener La URL*/
function url() {
    var movie = document.getElementById("search").value; //Recupera el valor de entrada de la etiqueta input con id "search"
    movie = movie.toLowerCase();
    if (movie.length === 9 && movie.search('tt') === 0) {
        getURL = "https://www.omdbapi.com/?apikey=99cef5c3&i=" + movie + "&plot=full&page="; //Concatena la url con el valor recuperado
        console.log(getURL, movie.search('tt'));
        return getURL; //Devuelve un valor String. Es la url completa
    } else {
        getURL = "https://www.omdbapi.com/?apikey=99cef5c3&s=" + movie + "&plot=full&page="; //Concatena la url con el valor recuperado
        console.log(getURL);
        return getURL; //Devuelve un valor String. Es la url completa
    }
}


/*FUNCION PARA OBTENER EL JSON DE LA URL*/
function transform(cont) {
    //console.log(typeof (url())); //Tipo de dato de retorna la funcion url()
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", url() + cont, false);
    Httpreq.send(null);
    var text = Httpreq.responseText; //Guarda el JSON en la variable text

    var obj = JSON.parse(text); //Al recibir datos de un servidor web, los datos siempre son un String. Con parse los datos se convierten en un objeto JavaScript.
    return obj; //retorna el Objeto 
    //console.log("ESTE ES EL JSON String: " + typeof (text));
    console.log("Texto JSON " + text);

    //console.log("ESTE ES EL JSON OBJETO: " + typeof (obj));
    //console.log("Objeto " + obj);
}

var pages = 0; //variable global

/*Funcion para obtener las consultas de varias peliculas */
function apiCall(cont) {

    /*Condicion para obtener los datos segun el ID o el nombre de la pelicula */
    console.log(url().search("i=")); //Obtiene la posicion de "i="
    if (url().search("i=") == 41) {
        var arrCab = Object.getOwnPropertyNames(transform(cont)); //Obtiene y guarda los elementos del Objeto JSON, es decir las propiedades de los nombres del objeto
        var arrDet = Object.values(transform(cont)); //Obtiene y guarda los resultados del objeto

        console.log(arrDet); //Muestra en consola el vector donde estan los resultados del objeto JSON

        document.getElementById("pagination").innerHTML = " ";

        var alm = "";
        var alm2 = "";
        var alm3 = "";

        // console.log("Vector prueba.... " + arrDet);

        var poster = arrDet[13]; //obtiene el dato de la imagen en la posicion 13 y lo guarda
        var ratings = arrDet[14];

        /*Bucle para obtener los datos del vector y mostrarlos en la primera tabla */
        for (let i = 0; i < 9; i++) {
            if (arrDet[i] == "N/A") {
                alm +=
                    "<th>" + arrCab[i] + "</th>" +
                    "<td>Sin Informacion</td></tr>";
            } else {
                alm +=
                    "<th>" + arrCab[i] + "</th>" +
                    "<td>" + arrDet[i] + "</td></tr>";
            }
        }
        if (arrDet[13] == "N/A") {
            document.getElementById("moviesDetalles").innerHTML = "<tr> <th rowspan='9'><img src=https://www.townoftazewell.org/wp-content/gallery/misc/no-image-found.jpg></th>" + alm;
        } else {
            document.getElementById("moviesDetalles").innerHTML = "<tr> <th rowspan='9'><img src=" + poster + "></th>" + alm;
        }


        /*Bucle para obtener los datos del vector y mostrarlos en la segunda tabla */
        for (let i = 10; i < 19; i++) {
            if (arrCab[i] == "Poster" || arrDet[i] == poster) {

            } else if (arrDet[i] === ratings) {
                alm2 += "<tr><th rowspan='" + (((ratings.length) * 2) + 1) + "'>Ratings</th>";
                for (let i = 0; i < ratings.length; i++) {
                    if (ratings[i] == "N/A") {
                        "<tr><th>Source</th>" +
                            "<td>Sin Informacion</td></tr>" +
                            "<tr><th>Value</th>" +
                            "<td>Sin Informacion</td></tr>";
                    } else {
                        alm2 +=
                            "<tr><th>Source</th>" +
                            "<td>" + ratings[i].Source + "</td></tr>" +
                            "<tr><th>Value</th>" +
                            "<td>" + ratings[i].Value + "</td></tr>";
                    }
                }
                alm2 += "</tr>"
            } else {
                if (arrDet[i] == "N/A") {
                    alm2 +=
                        "<tr><th>" + arrCab[i] + "</th>" +
                        "<td>Sin Informacion</td></tr>";
                } else {
                    alm2 +=
                        "<tr><th>" + arrCab[i] + "</th>" +
                        "<td>" + arrDet[i] + "</td></tr>";
                }
            }
        }
        document.getElementById("moviesDetallesPart2").innerHTML = alm2;

        /*Bucle para obtener los datos de los vector y mostrarlos en la tercera tabla */
        for (let i = 19; i < 24; i++) {
            if (arrDet[i] == "N/A") {
                alm3 +=
                    "<tr><th>" + arrCab[i] + "</th>" +
                    "<td>Sin Informacion</td></tr>";
            } else {
                alm3 +=
                    "<tr><th>" + arrCab[i] + "</th>" +
                    "<td>" + arrDet[i] + "</td></tr>";
            }
        }
        document.getElementById("moviesDetallesPart3").innerHTML = alm3;
        document.getElementById("moviesDetallesPart4").innerHTML = "<tr><th>" + arrCab[9] + "</th>" + "<td style='width: 800px; height: 50px;'>" + arrDet[9] + "</td></tr>";

    } else if (url() === "https://www.omdbapi.com/?apikey=99cef5c3&s=&plot=full") {
        alert("Ingrese lo que desea buscar"); //Muestra una alerta en caso de que se cumpla esta condicional
    } else {

        document.getElementById("tabla_2").innerHTML = "<tbody id='moviesDetallesPart2'> </tbody>"; //Limpia la cabecera y detalle de la segunda tabla
        document.getElementById("tabla_3").innerHTML = "<tbody id='moviesDetallesPart3'> </tbody>"; //Limpia la cabecera y detalle de la tercera tabla
        document.getElementById("tabla_4").innerHTML = "<tbody id='moviesDetallesPart4'> </tbody>"; //Limpia la cabecera y detalle de la tercera tabla

        console.log("funcion " + transform(cont));
        var arrAll = Object.values(transform(cont).Search);
        console.log(arrAll);

        var arrPaginas = Object.values(transform(cont).totalResults); //Guarda en un array los resultados totales
        console.log(arrPaginas); //Muestra en consola el array

        /*Obtiene los resultados totales del array y los guarda en un string */
        var paginas = '';
        arrPaginas.forEach(element => {
            paginas += element;
        });

        var numPaginas = parseInt(paginas); //Transforma el String en un Entero
        console.log("Total resultados= " + numPaginas); // muestra en consola el numero de paginas

        pages = (numPaginas / 10);
        console.log("Pagina totales# " + pages);

        /**********************Bucle para mostrar los enlaces de paginacion **********************/
        /*var enlaces = '';
        for (let e = 1; e <= numPaginas; e++) {
            enlaces += "<a>" + e + "</a>";
        }
        document.getElementById("pagination").innerHTML = enlaces;*/


        //Bucle For para mostrar los resultados en la Tabla
        var con = "";
        for (var i = 0; i < arrAll.length; i++) {
            /*Condicional para sustituir una imagen vacia por otra, al cumplir la condicion cambia la imagen*/
            if (arrAll[i].Poster == "N/A") {
                con +=
                    "<tr><th rowspan= '4'><img src='https://www.townoftazewell.org/wp-content/gallery/misc/no-image-found.jpg'></th>" +
                    "<th>Title</th>" +
                    "<td>" + arrAll[i].Title + "</td></tr>" +
                    "<tr><th>Year</th>" +
                    "<td>" + arrAll[i].Year + "</td></tr>" +
                    "<tr><th>imdbID</th>" +
                    "<td>" + arrAll[i].imdbID + "</td></tr>" +
                    "<tr><th>Type</th>" +
                    "<td>" + arrAll[i].Type + "</td></tr>";
            } else {
                con +=
                    "<tr> <th rowspan='4'><img src=" + arrAll[i].Poster + "></th>" +
                    "<th>Title</th>" +
                    "<td>" + arrAll[i].Title + "</td></tr>" +
                    "<tr><th>Year</th>" +
                    "<td>" + arrAll[i].Year + "</td></tr>" +
                    "<tr><th>imdbID</th>" +
                    "<td>" + arrAll[i].imdbID + "</td></tr>" +
                    "<tr><th>Type</th>" +
                    "<td>" + arrAll[i].Type + "</td></tr>";
            }
            var movies = [i];
        }
        console.log("Array Pelies " + movies);
        document.getElementById("moviesDetalles").innerHTML = con; //Muestra los resultados almacenados en la variable con, en formato HTML
        /*Muestra las flechas de atras y adelante */
        document.getElementById("pagination").innerHTML = "<a onclick='previous()' href='#animacion' class='flechas'><i class='fas fa-angle-double-left'></i></a>" + "<a onclick='next()' href='#animacion' class='flechas'> <i class='fas fa-angle-double-right'></i> </a>";
    }
}

/*FUNCION PARA OBTENER EL NUMERO ENTERO */
function esEntero() {
    if (pages % 1 == 0) {
        console.log("Es un numero entero" + pages);
        return pages;
    } else {
        console.log("Es un numero decimal" + pages);
        return Math.floor(pages) + 1;
    }
}


var i = 1;
function next() {
    if (i < esEntero()) {
        i++;
        console.log("Pagina numero** " + i);
        apiCall(i);
    }
}
function previous() {
    if (i > 1) {
        i--;
        console.log("Pagina numero** " + i);
        apiCall(i);
    }
}   