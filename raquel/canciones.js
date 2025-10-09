let canciones=[];
for(contador=0;contador<canciones.length;contador++){
    console.log("Cancion",(contador+1)+":","| Name:",canciones[contador].name,"| Author:",canciones[contador].author,"| date:",canciones[contador].date[0],"|");
}
function añadirCancion(){
    cancion =[
        {
        name3:document.getElementById(name2),
        author2:document.getElementById(author),
        year:document.getElementById(year_release),
        fav:document.getElementById(fav),
        }
        
    ]
    canciones.push(cancion);
};
function mostrar(){
for(let contador=0;contador<canciones.length;contador++){
    window.alert("Cancion",(contador+1)+":","| Name:",canciones[contador].name3,"| Author:",canciones[contador].author2,"| date:",canciones[contador].year,"|");
}
}


