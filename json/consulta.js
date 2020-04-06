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
        var busca = arrDet[13]; //obtiene el dato de la imagen en la posicion 13 y lo guarda


        for (let i = 0; i < 9; i++) {
            alm +=
                "<th>" + arrCab[i] + "</th>" +
                "<td>" + arrDet[i] + "</td></tr>";
        }
        document.getElementById("moviesDetalles").innerHTML = "<tr> <th rowspan='9'><img src=" + busca + "></th>" + alm;

        for (let i = 9; i < 19; i++) {
            if (arrCab[i] == "Poster" || arrDet[i] == busca) {

            } else {
                alm2 +=
                    "<tr><th>" + arrCab[i] + "</th>" +
                    "<td>" + arrDet[i] + "</td></tr>";
            }
        }
        document.getElementById("moviesDetallesPart2").innerHTML = alm2;

        for (let i = 19; i < 24; i++) {
            alm3 +=
                "<tr><th>" + arrCab[i] + "</th>" +
                "<td>" + arrDet[i] + "</td></tr>";
        }
        document.getElementById("moviesDetallesPart3").innerHTML = alm3;

    } else {

        document.getElementById("moviesCabecera").innerHTML = "<th> </th>";

        var arrAll = Object.values(obj.Search);
        console.log(arrAll);


        //Bucle For para mostrar los resultados de la Tabla
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
                    "<td>" + arrAll[i].Type + "</td></tr> <br>";
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
                    "<td>" + arrAll[i].Type + "</td></tr> <br>";
            }
        }
        document.getElementById("moviesDetalles").innerHTML = con; //Muestra los resultados almacenados en la variable con, en formato HTML
    }
}