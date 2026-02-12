import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    console.log("Your Pokedex:");
    Object.values(state.pokedex).forEach((value) => {
        console.log(`  - ${value.name}`);
    })
}