function obtenerDatos(){
fetch('https://api.open-meteo.com/v1/forecast?latitude=39.466307962945415&longitude=-6.385880542352156&hourly=temperature_2m&timezone=Europe%2FBerlin')
        .then(response => response.json())  
        .then(json => {
            printWeather(json);
        });
fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())  
        .then(json => {
            printPosts(json);
        });
}
function printWeather(json) {
    const container = document.getElementById('tiempo')
    let now=new Date();
    let hora_Actual=0;
    let minutos=now.getMinutes();
    if (now.getMinutes()<10){
        minutos=`0${now.getMinutes()}`;
    }
    let horas=now.getHours();
    if (now.getHours()<10){
        minutos=`0${now.getHours()}`;
    }
    tiempo.innerHTML = `
        <div class="weather-card">
        <h2>Weather Forecast</h2>
        <p>Latitude: ${json.latitude}</p>
        <p>Longitude: ${json.longitude}</p>
        <h3>Hourly Temperature</h3>
        <p>Time: ${horas}:${minutos}</p>
        <p>Temperature in 2 hours: ${json.hourly.temperature_2m[horas+2]} °C</p> 
        </div>
    `;
}

function printPosts(json) {
    const container2 = document.getElementById('posts');
    const rand1to10 = (Math.floor(Math.random() * 100));
    let post1="";
    let user1=0;
    for (let i = 0; i < json.length; i++) {
        user1=json[rand1to10].userId;
        if (json[i].userId===user1){
            post1=json[i].body;
        }
    }
        posts.innerHTML=`
        <div class="post-card">
        <h2>Post by User ${user1}</h2>
            <p>${post1}</p>
        </div>
        `;
    }
