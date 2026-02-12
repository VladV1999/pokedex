import { State } from "./state.js";
export async function commandExplore(state: State, location: string): Promise<void> {
    console.log(`Exploring ${location.toLowerCase()}...`);
    const data = await state.pokeapi.fetchLocation(location);
    const pokemonSpotted = data.pokemon_encounters;
    console.log("Found Pokemon:");
    for (const entry of pokemonSpotted) {
        const pokemon = entry.pokemon.name;
        console.log(`- ${pokemon}`);
    }
}