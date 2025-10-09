
let canciones=[
    {
        name:"La Macarena",
        author:"Los del Río",
        date:new Date("17-12-1990"),
       },
       
    {
           name:"El Porompompero",
           author:"Manolo Escobar",
           date:new Date("9-8-1960"),
    },
];
// array date funciona. console.log(canciones[0].date[0]);
for(contador=0;contador<canciones.length;contador++){
    console.log("Cancion",(contador+1)+":","| Name:",canciones[contador].name,"| Author:",canciones[contador].author,"| date:",canciones[contador].date[0],"|");
}

cancion_aux={
    name_aux:prompt("Insert the name of the new song: "),
    author_aux:prompt("Insert the name of the author:"),
    date_aux:new Date,
}

