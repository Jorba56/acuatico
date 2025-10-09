let canciones=[];
/*for(contador=0;contador<canciones.length;contador++){
    console.log("Cancion",(contador+1)+":","| Name:",canciones[contador].name,"| Author:",canciones[contador].author,"| date:",canciones[contador].date[0],"|");
};*/
function añadirCancion(){
        let name_song=(document.getElementById("title").value);
        let author_song=(document.getElementById("author").value);
        let year=parseInt(document.getElementById("year_release").value);
        let fav_song=(document.querySelector('input[name="fav"]:checked').value);
    song={
            name_song,
            author_song,
            year,
            fav_song,
        };
    canciones.push(song);
};
function mostrar(){

    window.alert("Song "+contador+":"+canciones[contador].name_song+canciones[contador].author_song+canciones[contador].year+canciones[contador].fav_song);
};

