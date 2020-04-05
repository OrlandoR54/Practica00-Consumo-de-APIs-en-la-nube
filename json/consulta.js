/*Funcion Para obtener La URL*/
function url() {
    var movie = document.getElementById("search").value; //Recupera el valor de entrada de la etiqueta input con id "search"
    movie = movie.toLowerCase();
    if (movie.length === 9 && movie.search('tt') === 0) {
        getURL = "https://www.omdbapi.com/?apikey=99cef5c3&i=" + movie + "&plot=full"; //Concatena la url con el valor recuperado
        console.log(getURL, movie.search('tt'));
        return getURL; //Devuelve un valor String, es la url completa
    } else {
        getURL = "https://www.omdbapi.com/?apikey=99cef5c3&s=" + movie + "&plot=full"; //Concatena la url con el valor recuperado
        console.log(getURL);
        return getURL; //Devuelve un valor String, es la url completa
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

    console.log("ESTE ES EL JSON OBJETO: " + typeof (obj));

    console.log(Object.keys(obj))
    console.log(typeof (url()));
    console.log(url().search("i="));
    if (url().search("i=") == 41) {
        var arrCab = Object.getOwnPropertyNames(obj);
    var arrDet = Object.values(obj);

    console.log("Vector" + arrDet);
    console.log("Prueba vector " + arrCab);
    
    //Bucle ForEach para mostrar los resultados de la Tabla cabecera
    var alm = "";
    arrCab.forEach(element => {
        //Evita mostrar los titulos de Response y Poster y solo muestra los demas resultados
        if (element == "Response" || element == "Poster") {
            
        } else {
            alm += 
            "<th>" + element + "</th>";   
        } 
    });
    document.getElementById("moviesCabecera").innerHTML = "<th> </th>" + alm;
    
    
    //Bucle ForEach para mostrar los detalles en la Tabla detalle
    var busca = arrDet[13]; //obtiene el dato en la posicion 13 y lo guarda
    var detalles = "";
    arrDet.forEach(element => {
        /*arrDet.forEach(imgs => {
            if (imgs == busca) {
                document.getElementById("container").innerHTML = "<img src="+ imgs + ">";
            }
        });*/

         //Evita mostrar datos innecesarios
        if (element == "True" || element == busca) {
           
        }else {
            detalles += "<td>" + element + "</td>";
        }
    });
    document.getElementById("moviesDetalles").innerHTML = "<td><img src=" + busca + "></td>" + detalles;

    /*for(var i=0; i < obj.length; i++){
        alm +="<tr>"+
        "<td><img src="+obj[i].Poster+"></td>" +
        "<td>"+obj[i].Title + "</td>" +
        "<td>"+obj[i].Year + "</td>" +
        "<td>"+obj[i].Rated + "</td>" +
        "<td>"+obj[i].Runtime + "</td>" +
        "<td>"+obj[i].Genre + "</td>" +
        "<td>"+obj[i].Director+ "</td>" +
        "<td>"+obj[i].Actors+ "</td>" +
        "<td>"+obj[i].Plot + "</td> " +

        "</tr>";
    }*/

    } else {
        var arrAll = Object.values(obj.Search);
        console.log(arrAll);

        //Bucle For para mostrar los resultados de la Tabla
        var con = "";
        for (var i = 0; i < arrAll.length; i++) {
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
        document.getElementById("moviesDetalles").innerHTML = con; //Muestra los resultados almacenados en la variable con, en formato HTML
    }
}


