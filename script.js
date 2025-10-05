const containerPok = document.getElementById("conPoke");
const nombrePoke = document.getElementById("namePoke");
const pokeText = document.getElementById("defaultText");
const pokeImg = document.getElementById("poke");
const loadingDef = (document.getElementById("poke").src =
  "https://imgs.search.brave.com/7iVraPqy7eVIf7lcVuIALEHUeO6w3X5llUFdoCt0XlU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/dXB5MENaNkMwSTBB/QUFBbS9lZXZlZS1w/b2tlbW9uLndlYnA");
const descTag = document.getElementById("descPoke");

const bgTipos = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#825ae7ff",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};


pokeText.textContent = "Ingresa un poke a buscar";
document.getElementById("btn2").addEventListener("click", obtenerPokemon);

async function obtenerPokemon() {
  const pok = document.getElementById("inputPoke").value.trim().toLowerCase();
  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/" + pok);
    const data = await respuesta.json();
    console.log(data);
    nombrePoke.textContent = data.name;
    if (document.getElementById("checkShiny").checked) {
      document.getElementById("poke").src = data.sprites.front_shiny;
    } else {
      document.getElementById("poke").src = data.sprites.front_default;
    }

    const descripcion = {
      id: "ID: " + data.id,
      altu : "Altura: " + data.height,
      tips: `Tipos: ${data.types[0].type.name}${data.types[1] ? ' ' + data.types[1].type.name : ''}`   
    };

    descTag.textContent = `${descripcion.id}\n${descripcion.altu}\n${descripcion.tips}`
    descTag.style.whiteSpace = "pre-line";
    const typoPoke = data.types[0].type.name;
    console.log(typoPoke);
    containerPok.style.backgroundColor = bgTipos[typoPoke];
  } catch (error) {
    pokeText.textContent = "Error al obtener el Pokémon";
    pokeImg.src =
      "assets/error.png";
  }
}
