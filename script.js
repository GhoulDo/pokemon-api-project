// Esperamos a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const pokemonResult = document.getElementById('pokemon-result');

    // Función para hacer la solicitud a la API de Pokémon
    const getPokemonData = () => {
        const pokemonName = document.getElementById('pokemon-name').value.toLowerCase(); // Nombre del Pokémon
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;  // URL a la PokeAPI
        
        // Hacemos la solicitud con fetch
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon no encontrado');
                }
                return response.json();  // Convertimos la respuesta en JSON
            })
            .then(data => {
                // Llenamos el contenido de la tarjeta con la información del Pokémon
                pokemonResult.innerHTML = `
                    <h2>${data.name.toUpperCase()} (#${data.id})</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
                    <p><strong>Altura:</strong> ${data.height / 10} metros</p>
                    <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                `;
                pokemonResult.style.display = 'block'; // Mostramos la tarjeta
            })
            .catch(error => {
                pokemonResult.innerHTML = `<p>${error.message}</p>`;
                pokemonResult.style.display = 'block'; // Mostramos el mensaje de error
            });
    };

    // Añadimos un evento de clic al botón de búsqueda
    searchBtn.addEventListener('click', getPokemonData);
});
