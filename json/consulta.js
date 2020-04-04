
/*
function apiCall() {
    var movie = document.getElementById("search").value ;
    var url = "https://www.omdbapi.com/?apikey=99cef5c3&s="+ movie;
    document.getElementById("co").innerHTML=url;
    $.getJSON(url).then(
        function(response) {
            var imagen = response.Poster;
            console.log(imagen);
            if (imagen !== "N/A") {
                $('img').attr('src', imagen);
            }

        });
};
*/

function url() {
    var movie = document.getElementById("search").value; //Recupera el valor de entrada del input con id "search"
    var getURL = "https://www.omdbapi.com/?apikey=99cef5c3&t=" + movie + "&plot=full"; //Concatena la url con el valor recuperado
    //console.log(getURL);
    return getURL; //Devuelve un valor String, es la url completa
}



function apiCall() {
    /////OBTIENE EL JSON DE LA URL
    //console.log(typeof (url())); //Tipo de dato de retorna la funcion url()
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", url(), false);
    Httpreq.send(null);
    var text = Httpreq.responseText; //Guarda el JSON en la variable text

    /*Al recibir datos de un servidor web, los datos siempre son un String. Con parse los datos se convierten en un objeto JavaScript.*/
    var obj = JSON.parse(text);
    
    console.log("ESTE ES EL JSON STRING: " + typeof (text));
    console.log("ESTE ES EL JSON OBJETO: " + typeof (obj));
    console.log(text);
    console.log("----------------------");
    console.log(obj);
    console.log(Object.keys(obj).length);
    console.log(Object.keys(obj));
    console.log(Object.keys(obj.Ratings));
    //document.getElementById("co").innerHTML = Object.keys(obj);

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
}
