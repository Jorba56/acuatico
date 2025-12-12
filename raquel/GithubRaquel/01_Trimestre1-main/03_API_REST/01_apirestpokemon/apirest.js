// Obtenemos los datos de todos los pokemon 
// Fetch the data of all Pokémon from the API
fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => {
        // Check if the HTTP response is OK (status in the range 200-299)
        if (!response.ok) {
            // If the response is not OK, throw an error to be caught later
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // If the response is OK, parse the response body as JSON
        return response.json();
    })
    .then(json => {
        // Once the JSON is parsed, call the function to process and display Pokémon
        printPokemons(json.results);
    })
    .catch(error => {
        // This block handles any errors:
        // 1. Network errors (e.g., no internet connection)
        // 2. HTTP errors thrown manually above
        console.error(error); // Log the error details in the console for debugging
        alert("Unable to load Pokémon data."); // Show a user-friendly message
    });

/*
Additional notes:
- fetch() only rejects the promise on network errors, not on HTTP errors.
- That's why we check 'response.ok' and throw an error manually if needed.
- This ensures both network issues and bad HTTP responses are handled properly.
*/

// Pinta todos los pokemos insertando un HTML dentro del #container
function printPokemons(pokemons) {
  const container = document.getElementById('container')
  pokemons.forEach(pokemon => {
    container.innerHTML = `
    ${container.innerHTML}
    <div class="card">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png"/>
    <span>Nº.${getPokemonId(pokemon.url)}</span>
    <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
    </card>
  `;
  });
}

// En esta ruta de la API no nos viene el id de cada pokemon, pero si que nos viene
// una URL, para poder obtener todos los datos de ese pokemon, la cual contiene su ID
// así que le extraigo el ID a la URL
function getPokemonId(url) {
  return url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/','')
}