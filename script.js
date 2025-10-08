const containerPok = document.getElementById("conPoke");
const nombrePoke = document.getElementById("namePoke");
const pokeText = document.getElementById("defaultText");
const pokeImg = document.getElementById("poke");
const loadingDef = (document.getElementById("poke").src =
  "https://imgs.search.brave.com/7iVraPqy7eVIf7lcVuIALEHUeO6w3X5llUFdoCt0XlU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/dXB5MENaNkMwSTBB/QUFBbS9lZXZlZS1w/b2tlbW9uLndlYnA");
const descTag = document.getElementById("descPoke");
/* const defaultStyle = {
  fondo : containerPok.style.backgroundColor = "#FF00FF"
} */

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
  
  pokeText.textContent = "Ingresa un poke a buscar"
  const pok = document.getElementById("inputPoke").value.trim().toLowerCase();
  try {
    pokeImg.classList.remove('errorPoke')

    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/" + pok);
    const data = await respuesta.json();
    console.log(data);
    nombrePoke.textContent = data.name;
    if (document.getElementById("checkShiny").checked) {
      pokeImg.src = data.sprites.front_shiny;
    } else {
      pokeImg.src = data.sprites.front_default;
    }

    const descripcion = {
      id: "ID: " + data.id,
      altu: "Altura: " + data.height,
      tips: `Tipos: ${data.types[0].type.name} ${data.types[1] ? ' ' + data.types[1].type.name : ''}`
    };

    descTag.textContent = `${descripcion.id}\n${descripcion.altu}\n${descripcion.tips}`
    descTag.style.whiteSpace = "pre-line";
    const typoPoke = data.types[0].type.name;
    const typoPoke2 = data.types[1]?.type.name;
    if (typoPoke2 !== undefined) {
      containerPok.style.backgroundImage = `linear-gradient(to right, ${bgTipos[typoPoke]}, ${bgTipos[typoPoke2]})`
    } else {
      containerPok.style.backgroundImage = `linear-gradient(to right, ${bgTipos[typoPoke]}, #000000ff)`
    }
    if (!containerPok.classList.contains('pokeActivo')) {
      containerPok.classList.add('pokeActivo');
      nombrePoke.classList.add('descActivo');
      descTag.classList.add('descActivo');
    }


  } catch (error) {
    pokeImg.classList.add("errorPoke")
    nombrePoke.textContent = "";
    descTag.textContent = "";
    containerPok.style.backgroundImage = "none"
    containerPok.style.backgroundColor = "none";
    pokeText.textContent = "Error al obtener el Pokémon";
    pokeImg.src = "assets/error.png";
    containerPok.classList.remove('pokeActivo');
    nombrePoke.classList.remove('descActivo');
    descTag.classList.remove('descActivo');
  }
}


const containerCata = document.getElementById("containerCatalog")

async function catalogPokes() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=151"
  const respuesta2 = await fetch(url)
  const datos = await respuesta2.json()
  const pokemons = datos.results

  for (const element of pokemons) {
    try {
      const pokeIndivCatalog = await fetch(element.url);
      const datosIndividuales = await pokeIndivCatalog.json();

      const containerCuadro = document.createElement('div')
      containerCuadro.classList.add('pokeIndividual')
      const nameIndividual = document.createElement("p")
      nameIndividual.classList.add('nameIndividual')
      nameIndividual.textContent = element.name
      const spritePoke = document.createElement('img')
      spritePoke.src = datosIndividuales.sprites.front_default
      const idIndividual = document.createElement("p")
      idIndividual.classList.add('idIndividual')

      idIndividual.textContent = `ID: ${datosIndividuales.id}`

      containerCuadro.appendChild(nameIndividual)
      containerCuadro.appendChild(spritePoke)
      containerCata.appendChild(containerCuadro)
      containerCuadro.appendChild(idIndividual)

      containerCuadro.addEventListener('click', () => {
        document.getElementById("inputPoke").value = element.name;
        obtenerPokemon();
      });
    } catch (error) {
      console.log("Aint working");

    }
  }
}
catalogPokes()