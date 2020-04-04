
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
/*

$(document).ready(function () {
    var movie = document.getElementById("search").value ;
    var url = "https://www.omdbapi.com/?apikey=99cef5c3&s="+ movie;
    document.getElementById("co").innerHTML=url;
    $.getJSON(url,
    function (json) {
        
        var tr;
        tr = $('<tr/>');
        tr.append("<td><img src=" + json.Poster + " width='200' height='297'></td>");
        tr.append("<td>" + json.Title + "</td>");
        tr.append("<td>" + json.Year + "</td>");
        tr.append("<td>" + json.Rated + "</td>");
        tr.append("<td>" + json.Runtime + "</td>");
        tr.append("<td>" + json.Genre + "</td>");
        tr.append("<td>" + json.Director + "</td>");
        tr.append("<td>" + json.Actors + "</td>");
        tr.append("<td>" + json.Plot + "</td>");
        $('#imdb').append(tr);
    });
});
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
    //document.getElementById("co").innerHTML = JSON.stringify(obj);

    var arr = [obj];
    var alm = "";

    console.log("Vector" + Object.values(obj));
    console.log("Prueba vector " + Object.getOwnPropertyNames(obj));

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
    }
    /*alm +="<tr>"+
        "<td><img src="+url.Poster+"></td>" +
        "<td>"+url.title + "</td>" +
        "<td>"+url.Year + "</td>" +
        "<td>"+url.Rated + "</td>" +
        "<td>"+url.Runtime + "</td>" +
        "<td>"+url.Genre + "</td>" +
        "<td>"+url.Director+ "</td>" +
        "<td>"+url.Actors+ "</td>" +
        "<td>"+url.Plot + "</td> " +

        "</tr>";*/
    //document.getElementById("co").innerHTML = url();
}


/*
function apiCall() {
    var movie = document.getElementById("search").value ;
    var url = "https://www.omdbapi.com/?apikey=99cef5c3&s="+ movie;
    var detalles ="";
    $.get("https://www.omdbapi.com/?s=" + movie + "&apikey=99cef5c3", function (rawdata) {
        var rawstring = JSON.stringify(rawdata);
        data = JSON.parse(rawstring);
        var title = data.Search[0].Title;
        var year = data.Search[0].Year;
        var imdburl = "https://www.imdb.com/title/" + data.Search[0].imdbID + "/";

        var posterurl = data.Search[0].Poster;
        document.getElementById("replica").innerHTML = "<h2>" + title + "</h2><br> <img src= '" + posterurl + "'><br><p> Year Released:" + year + "</p> <br> <p> IMDB page: <a href='" + imdburl + "'target='_blank'>" + imdburl + "</a></p>";
    });
}
*/
