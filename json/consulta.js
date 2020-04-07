/*Funcion Para obtener La URL*/
function url() {
    var movie = document.getElementById("search").value; //Recupera el valor de entrada de la etiqueta input con id "search"
    movie = movie.toLowerCase();
    if (movie.length === 9 && movie.search('tt') === 0) {
        getURL = "https://www.omdbapi.com/?apikey=99cef5c3&i=" + movie + "&plot=full"; //Concatena la url con el valor recuperado
        console.log(getURL, movie.search('tt'));
        return getURL; //Devuelve un valor String. Es la url completa
    } else {
        getURL = "https://www.omdbapi.com/?apikey=99cef5c3&s=" + movie + "&plot=full"; //Concatena la url con el valor recuperado
        console.log(getURL);
        return getURL; //Devuelve un valor String. Es la url completa
    }
}

/*Funcion para obtener las consultas de varias peliculas */
function apiCall() {
    /////OBTIENE EL JSON DE LA URL
    //console.log(typeof (url())); //Tipo de dato de retorna la funcion url()
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", url(), false);
    Httpreq.send(null);
    var text = Httpreq.responseText; //Guarda el JSON en la variable text

    var obj = JSON.parse(text); //Al recibir datos de un servidor web, los datos siempre son un String. Con parse los datos se convierten en un objeto JavaScript.

    console.log("ESTE ES EL JSON String: " + typeof (text));

    console.log("ESTE ES EL JSON OBJETO: " + typeof (obj));
    console.log("Objeto " + obj);


    /*Condicion para obtener los datos segun el ID o el nombre de la pelicula */
    console.log(url().search("i=")); //Obtiene la posicion de "i="
    if (url().search("i=") == 41) {
        var arrCab = Object.getOwnPropertyNames(obj); //Obtiene y guarda los elementos del Objeto JSON, es decir las propiedades de los nombres del objeto
        var arrDet = Object.values(obj); //Obtiene y guarda los resultados del objeto

        console.log(arrDet); //Muestra en consola el vector donde estan los resultados del objeto JSON
        //console.log("Prueba vector: " + arrCab);


        var alm = "";
        var alm2 = "";
        var alm3 = "";

        //var arrDet = "[" + text + "]";
        // console.log("Vector prueba.... " + arrDet);
        var poster = arrDet[13]; //obtiene el dato de la imagen en la posicion 13 y lo guarda
        var ratings = arrDet[14];

        /*Bucle para obtener los datos del vector y mostrarlos en la primera tabla */
        for (let i = 0; i < 9; i++) {
            alm +=
                "<th>" + arrCab[i] + "</th>" +
                "<td>" + arrDet[i] + "</td></tr>";
        }
        document.getElementById("moviesDetalles").innerHTML = "<tr> <th rowspan='9'><img src=" + poster + "></th>" + alm;

        /*Bucle para obtener los datos del vector y mostrarlos en la segunda tabla */
        for (let i = 10; i < 19; i++) {
            if (arrCab[i] == "Poster" || arrDet[i] == poster) {

            } else if (arrDet[i] === ratings) {
                alm2 += "<tr><th rowspan='" + (((ratings.length) * 2) + 1) + "'>Ratings</th>";
                for (let i = 0; i < ratings.length; i++) {
                    alm2 +=
                        "<tr><th>Source</th>" +
                        "<td>" + ratings[i].Source + "</td></tr>" +
                        "<tr><th>Value</th>" +
                        "<td>" + ratings[i].Value + "</td></tr>";
                }
                alm2 += "</tr>"
            } else {
                alm2 +=
                    "<tr><th>" + arrCab[i] + "</th>" +
                    "<td>" + arrDet[i] + "</td></tr>";
            }
        }
        document.getElementById("moviesDetallesPart2").innerHTML = alm2;

        /*Bucle para obtener los datos del vector y mostrarlos en la tercera tabla */
        for (let i = 19; i < 24; i++) {
            alm3 +=
                "<tr><th>" + arrCab[i] + "</th>" +
                "<td>" + arrDet[i] + "</td></tr>";
        }
        document.getElementById("moviesDetallesPart3").innerHTML = alm3;
        document.getElementById("moviesDetallesPart4").innerHTML = "<tr><th>" + arrCab[9] + "</th>" + "<td style='width: 800px; height: 50px;'>" + arrDet[9] + "</td></tr>";

    } else {

        document.getElementById("tabla_2").innerHTML = "<tbody id='moviesDetallesPart2'> </tbody>"; //Limpia la cabecera y detalle de la segunda tabla
        document.getElementById("tabla_3").innerHTML = "<tbody id='moviesDetallesPart3'> </tbody>"; //Limpia la cabecera y detalle de la tercera tabla

        var arrAll = Object.values(obj.Search);
        console.log(arrAll);


        //Bucle For para mostrar los resultados en la Tabla
        var con = "";
        for (var i = 0; i < arrAll.length; i++) {
            /*Condicional para sustituir una imagen vacia por otra */
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
        }
        document.getElementById("moviesDetalles").innerHTML = con; //Muestra los resultados almacenados en la variable con, en formato HTML
    }
}