import { State } from "./state";

export function cleanInput(input: string): string[] {
    const cleanedInput = input.trim();
    const loweredInput = cleanedInput.toLowerCase();
    return loweredInput.split(/\s+/);
}

export async function startREPL(state: State) {
    let rl = state.interface;
    rl.prompt()
    rl.on("line", async (line:string) => {
        
        const words = cleanInput(line);
        if (words.length === 0) {
            rl.prompt();
        } else {
            const commandName = words[0];
            const commands = state.commands;
            const cmd = commands[commandName];
            if (!cmd) {
                console.log(
                    `Unknown command: "${commandName}". Type "help" for a list of commands.`,
                );
                rl.prompt();
                return;
            }
            try {
                await cmd.callback(state);
            } catch (e) {
                console.log(e);
            }
            rl.prompt();
        }
    })
}           