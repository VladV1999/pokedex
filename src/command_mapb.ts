import { State } from "./state.js";

export async function commandMapB(state: State): Promise<void> {
    if (state.prevLocationsURL === null) {
        console.log("you're on the first page");
        return;
    }
    const data = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    for (const location of data.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
}