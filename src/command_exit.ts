import { State } from "./state.js";

export async function commandExit(state: State): Promise<void> {
    console.log("Welcome to the Pokedex!");
    state.interface.close();
    console.log("Closing the Pokedex... Goodbye!");
    process.exit(0);
}