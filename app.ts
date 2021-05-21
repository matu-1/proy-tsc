var page = 0;
var cantidad = 20;
const URLp = `https://pokeapi.co/api/v2/pokemon?limit=${cantidad}&offset=${
  cantidad * page
}`;
const URLimg = "https://pokeres.bastionbot.org/images/pokemon/";
const pokemonDiv = document.getElementById("pokemonContainer");

type Pokemon = {
  name: string;
  url: string;
};

async function getPokemons() {
  const data = await fetch(URLp).then((resp) => resp.json());
  return <Pokemon[]>data.results;
}

function getId(url: string) {
  const arrayValues = url.split("/");
  return arrayValues[arrayValues.length - 2];
}

async function pokemonBuild() {
  const pokemones = await getPokemons();
  for (const pokemon of pokemones) {
    const id = getId(pokemon.url);
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const url = document.createElement("p");
    const img = document.createElement("img");
    div.classList.add("pokemon");
    title.innerHTML = pokemon.name;
    url.innerHTML = pokemon.url;
    img.src = `${URLimg}${id}.png`;
    img.width = 300;
    img.height = 300;
    div.append(title);
    div.append(url);
    div.append(img);
    pokemonDiv?.append(div);
  }
  page++;
}

function cargarMas() {
  pokemonBuild();
}

pokemonBuild();
