
/*var datos = http://www.omdbapi.com/?apikey=99cef5c3&t=Batman

function apiCall(movie) {
  var movie = document.getElementById("search");
    $.getJSON('https://www.omdbapi.com/?t=' + movie + 
  '&apikey=99cef5c3').then(function(response) {
  console.log(response);
  var title = response.Title;
  var image = response.Poster;
  genre = response.Genre;
  plot = response.Plot;
  
  var arrGenres = genre.split(', ');
  console.log(arrGenres);

  if (title !== 'N/A') {
    $('.container-genre').append('<p>' + title + '</p>');
    $('#movie').append($('.container-genre'));
  }
  });
  }
  $('#searchForm').on('submit', function() {
    var text = $('#titleFld').val();
    apiCall(text);
  });

*/
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



function apiCall() {
    var movie = document.getElementById("search").value ;
    var url = "https://www.omdbapi.com/?apikey=99cef5c3&s="+ movie;
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

/*

function cargarDatos()
{
    var detalles="";
    for(var i=0; i < datos.length; i++){
        detalles +="<tr>"+
        "<td>"+datos[i].id + "</td> " +
        "<td>"+datos[i].first_name + "</td>" +
        "<td>"+datos[i].last_name + "</td>" +
        "<td>"+datos[i].email + "</td>" +
        "<td>"+datos[i].gender + "</td>" +
        "<td><img src="+datos[i].image+"></td>" +

        "</tr>";
    }
    document.getElementById("tablaDatosPersonalesDetalles").innerHTML=detalles;
}*/