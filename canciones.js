//Jorge Barriga Rubio
let canciones=[];
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
        for (let i = 0; i < canciones.length; i++) { //control for not having repeated song
            if (canciones[i].name_song === song.name_song && canciones[i].author_song === song.author_song && canciones[i].year === song.year) {
                repeated = true;
                break; // if one is repeated, the loop stops
            };
        };

        if (repeated) {
            alert("Esa canción ya existe en tu playlist.");
        } else {
            canciones.push(song);
            alert("Canción añadida correctamente.");
        };
        
};
function mostrar(){
    if (canciones.length===0){
        alert("Por favor, introduce una cancion para mostrarla en tu playlist.") //if we dont songs in our playlist and we want to show it, this message will appear.
    } else {
    let playlist=" ";
    for (let contador=0; contador<canciones.length;contador++){
        playlist += //the playlist is a concatenation of the songs.
            "Song " + (contador + 1) + ": " + // contador + 1 to not show something like "song 0" 
            "Título: " + canciones[contador].name_song + ", " +
            "Autor: " + canciones[contador].author_song + ", " +
            "Año: " + canciones[contador].year + ", " +
            "Favorita: " + canciones[contador].fav_song + "\n";
    };
    window.alert(playlist);
    };   
};
