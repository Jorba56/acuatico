//Jorge Barriga Rubio
let canciones=[];

function mostrarHora(){
    reloj2=true;
    let now=new Date();
    let hora_Actual=0;
    let minutos=now.getMinutes();
    let segundos=now.getSeconds();
    const hora = document.getElementById('hora');
    if (now.getMinutes()<10){
        minutos=`0${now.getMinutes()}`;
    }
    let horas=now.getHours();
    if (now.getHours()<10){
        minutos=`0${now.getHours()}`;
    }
    if (now.getSeconds()<10){
        segundos=`0${now.getSeconds()}`;
    }
    hora.innerHTML = `
        <p>Time: ${horas}:${minutos}:${segundos}</p>
        </div>
    `;
}
function añadirCancion(){
        let name_song=(document.getElementById("title").value);
        let author_song=(document.getElementById("author").value);
        let year=parseInt(document.getElementById("year_release").value);
        let fav_song=(document.querySelector('input[name="fav"]:checked').value);
        let genre_song=(document.getElementById("genre").value);
        let repeated=false;
        let incomplete=false;
    let song={
            name_song,
            author_song,
            year,
            fav_song,
            genre_song
        };
        if (name_song===""|| author_song===""|| isNaN(year)||genre_song===""){ /* if any field is missing, this message will appear*/
            alert("Por favor, complete todos los campos.");
            incomplete=true;
        }
        for (let i = 0; i < canciones.length; i++) { //control for not having repeated song
            if (canciones[i].name_song === song.name_song && canciones[i].author_song === song.author_song && canciones[i].year === song.year &&genre_song===canciones[i].genre_song) {
                repeated = true;
                break; // if one is repeated, the loop stops
            };
        };

        if (repeated) {
            alert("Esa canción ya existe en tu playlist.");
        } else if(!incomplete){ 
            canciones.push(song); /* if all the fields are completed correctly, that song will be added to the playlist.*/
            alert("Canción añadida correctamente.");
        };
        
};
function mostrar(){ /* this is my finish button*/
    if (canciones.length===0){
        alert("Por favor, introduce una cancion para mostrarla en tu playlist.") //if we dont songs in our playlist and we want to show it, this message will appear.
    } else {
    let playlist="";
    for (let contador=0; contador<canciones.length;contador++){/* the songs are sorted by the addition order of them*/
        playlist += //the playlist is a concatenation of the songs.
            "Song " + (contador + 1) + ": " + // contador + 1 to not show something like "song 0" 
            "Title: " + canciones[contador].name_song + ", " +
            "Author: " + canciones[contador].author_song + ", " +
            "Release year: " + canciones[contador].year + ", " +
            "Genre: " + canciones[contador].genre_song + ", " +
            "Favourite: " + canciones[contador].fav_song + "\n"; // \n to show the next song´s information in a readable format, by making a carry return
    };
    window.alert("Hay "+canciones.length+" canciones en la playlist."+ "\n"+playlist);
    };   
};
function eliminarCancion(){ /* this function allows to delete a song from the playlist*/
    if (canciones.length>0){
    let playlist="";
    for (let contador=0; contador<canciones.length;contador++){/* the songs are sorted by the addition order of them*/
        playlist += //the playlist is a concatenation of the songs.
            "Song " + (contador + 1) + ": " + // contador + 1 to not show something like "song 0" 
            "Title: " + canciones[contador].name_song + ", " +
            "Author: " + canciones[contador].author_song + ", " +
            "Release year: " + canciones[contador].year + ", " +
            "Genre: " + canciones[contador].genre_song + ", " +
            "Favourite: " + canciones[contador].fav_song + "\n"; // \n to show the next song´s information in a readable format, by making a carry return
    };
    let delete_song=window.prompt("Hay "+canciones.length+" canciones en la playlist."+ "\n"+playlist +"\n"+"Escribe el número de la canción que quieres eliminar:");
    canciones.splice((delete_song-1),1); /* for simplicity, the song with the index written will be deleted*/
    /* delete_song-1 because the user sees the songs starting from 1, but in the array the first song is in the index 0*/
    window.alert("Canción eliminada correctamente.");
    };
    if (canciones.length===0){
    alert("No hay canciones en la playlist para eliminar.");
};  
};
let reloj=setInterval(mostrarHora,1000);
//the time is updated every second
function stopHora(){
    if (reloj2==true){
    reloj2=false;
    clearInterval(reloj);
    }
    else{
        reloj=setInterval(mostrarHora,1000);
    }
}
//this function stops the time updating when called

//cambio para github y la nueva rama
//otro cambio para github
