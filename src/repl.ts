import { createInterface } from "node:readline";
import { CLICommand } from "./command.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        }
    }
}
export function cleanInput(input: string): string[] {
    const cleanedInput = input.trim();
    const loweredInput = cleanedInput.toLowerCase();
    return loweredInput.split(/\s+/);
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    })
    rl.prompt()
    rl.on("line", (line:string) => {
        
        const words = cleanInput(line);
        if (words.length === 0) {
            rl.prompt();
        } else {
            const commandName = words[0];
            const commands = getCommands();
            const cmd = commands[commandName];
            if (!cmd) {
                console.log(
                    `Unknown command: "${commandName}". Type "help" for a list of commandsl.`,
                );
                rl.prompt();
                return;
            }
            try {
                cmd.callback(commands);
            } catch (e) {
                console.log(e);
            }
            rl.prompt();
        }
    })
}