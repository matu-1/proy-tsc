"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var page = 0;
var cantidad = 20;
const URLimg = "https://pokeres.bastionbot.org/images/pokemon/";
const pokemonDiv = document.getElementById("pokemonContainer");
function getPokemons() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(getUrl()).then((resp) => resp.json());
        return data.results;
    });
}
function getId(url) {
    const arrayValues = url.split("/");
    return arrayValues[arrayValues.length - 2];
}
function pokemonBuild() {
    return __awaiter(this, void 0, void 0, function* () {
        const lastChild = pokemonDiv === null || pokemonDiv === void 0 ? void 0 : pokemonDiv.childNodes.item((pokemonDiv === null || pokemonDiv === void 0 ? void 0 : pokemonDiv.childNodes.length) - 1);
        if ((lastChild === null || lastChild === void 0 ? void 0 : lastChild.nodeName) == "BUTTON")
            lastChild.remove();
        const pokemones = yield getPokemons();
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
            pokemonDiv === null || pokemonDiv === void 0 ? void 0 : pokemonDiv.append(div);
        }
        page++;
        const button = document.createElement("button");
        button.innerHTML = "CARGAR MAS";
        button.classList.add("btn-block");
        button.onclick = cargarMas;
        pokemonDiv === null || pokemonDiv === void 0 ? void 0 : pokemonDiv.append(button);
    });
}
function cargarMas() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pokemonBuild();
        console.log("window.pageYOffset", window.pageYOffset);
        window.scroll({
            top: window.pageYOffset + 500,
            behavior: "smooth",
        });
    });
}
function goScrollEnd() {
    pokemonDiv === null || pokemonDiv === void 0 ? void 0 : pokemonDiv.scrollIntoView({ block: "end", behavior: "smooth" });
}
function getUrl() {
    return `https://pokeapi.co/api/v2/pokemon?limit=${cantidad}&offset=${cantidad * page}`;
}
pokemonBuild();
