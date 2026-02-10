import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { PokeAPI } from "./pokeapi.js";

export type Commands = Record<string, CLICommand>;
export type State = {
    pokeapi: PokeAPI; 
    interface: Interface;
    commands: Commands;
    nextLocationsURL?: string | null;
    prevLocationsURL?: string | null;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
}

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const commands = {
            exit: {
                name: "exit",
                description: "Exits the pokedex",
                callback: commandExit,
            },
            help: {
                name: "help",
                description: "Displays a help message",
                callback: commandHelp
            },
            map: {
                name: "map",
                description: "lists 20 locations",
                callback: commandMap,
            },
            mapb: {
                name: "mapb",
                description: "lists 20 locations, but the previous ones",
                callback: commandMapB
            }
        }
    return {
        pokeapi: new PokeAPI(),
        interface: rl,
        commands: commands
    }
}