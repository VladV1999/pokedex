import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    const data = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    for (const location of data.results) {
        console.log(location.name);
    }
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
}