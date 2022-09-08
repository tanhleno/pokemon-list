function addPokemonToList(pokemonName, pokemonList) {
    var item = document.createElement('li');
    item.className = 'list-group-item'
    item.textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    pokemonList.appendChild(item);
};

function ResponseError(message) {
    this.message = message;
    this.name = 'ResponseError';
}

async function fillPokemonList(limit, offset) {
    var pokemonList = document.querySelector('ul#pokemon-list');
    var status = document.querySelector('p#status');

    pokemonList.innerHTML = '';
    status.textContent = 'Loading pokemon list...';

    try {
        var response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
            throw new ResponseError('Network response was not ok');
        }
        var date = await response.json();
        if (!date.results.length) {
            status.textContent = 'Sorry, no pokemon found';
            return;
        }
        status.textContent = 'Successfully found';
        date.results.forEach(function (pokemon) {
            addPokemonToList(pokemon.name, pokemonList);
        });
    } catch (error) {
        status.textContent = `Error: ${error.message}`;
    }
}

fillPokemonList(151, 0);
