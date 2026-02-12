import { createInterface, type Interface } from "readline";
import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type Commands = Record<string, CLICommand>;
export type Pokedex = Record<string, Pokemon>;
export type State = {
    pokeapi: PokeAPI;
    pokedex: Pokedex; 
    interface: Interface;
    commands: Commands;
    nextLocationsURL?: string | null;
    prevLocationsURL?: string | null;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export function initState(): State {
    let pokedex = {};
    const cache = new Cache(5 * 60 * 1000);
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
                callback: commandHelp,
            },
            map: {
                name: "map",
                description: "lists 20 locations",
                callback: commandMap,
            },
            mapb: {
                name: "mapb",
                description: "lists 20 locations, but the previous ones",
                callback: commandMapB,
            },
            explore: {
                name: "explore",
                description: "lists the pokemon in a given area",
                callback: commandExplore,
            },
            catch: {
                name: "catch",
                description: "adds a pokemon to your pokedex!",
                callback: commandCatch,
            },
            inspect: {
                name: "inspect",
                description: "a more detailed inspection of the pokemon's stats!",
                callback: commandInspect,
            }
        }
    return {
        pokeapi: new PokeAPI(cache),
        interface: rl,
        commands: commands,
        pokedex: pokedex,
    }
}