import { State } from "./state.js";
export async function commandCatch(state: State, pokemonName: string): Promise<void> {
    const pokemonLower = pokemonName.toLowerCase();
    const data = await state.pokeapi.fetchPokemon(pokemonLower);
    const threshhold = Math.random() * 700;
    const caught: boolean = threshhold > data.base_experience;
    console.log(`Throwing a Pokeball at ${pokemonLower}...`);
    if (caught === false) {
        console.log(`${pokemonLower} escaped!`);
    }
    else {
        console.log(`${pokemonLower} was caught!`);
        state.pokedex[pokemonLower] = data;
    }
}