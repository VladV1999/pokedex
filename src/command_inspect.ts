import { State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string): Promise<void> {
    const pokemonLower = pokemonName.toLowerCase();
    const entry = state.pokedex[pokemonLower];
    if (!entry) {
        console.log("You have not caught that pokemon");
        return;
    }
    console.log(`Name: ${entry.name}`);
    console.log(`Height: ${entry.height}`);
    console.log(`Weight: ${entry.weight}`);
    console.log("Stats:");
    for (const stat of entry.stats) {
        console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log("Types:")
    for (const stat of entry.types) {
        console.log(`  - ${stat.type.name}`);
    }
}