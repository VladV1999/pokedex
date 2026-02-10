import { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    console.log("Available commands:");
    for (const i in state.commands) {
        const cmd = state.commands[i];
        console.log(`${cmd.name}: ${cmd.description}`);
    }
}