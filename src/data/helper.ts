import { generations } from "./poke/generations"
import languages from "./languages.json"
import types from "./types.json"
import { TypeFullLanguage, TypeFullTypes, TypeGeneration, TypeName, TypePokemon, getTypeColor } from "../types";

export const shuffle = (array: any[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

export const getTypeGradient = (pokemon:TypePokemon) => {
    if (!pokemon) return "linear-gradient(45deg, #fff, #fff)";
    const allTypes = fetchTypes();
    const type1 = allTypes.find((t) => t.name === pokemon.types[0]);
    const type2 = pokemon.types[1] ? allTypes.find((t) => t.name === pokemon.types[1]) : undefined;
    const colors = [];
    if (type1) colors.push(getTypeColor(type1));
    if (type2) colors.push(getTypeColor(type2));
    if (colors.length === 1) colors.push(colors[0]);
    return `linear-gradient(45deg, ${colors.join(",")})`;
}

export function getRandomPokemon(generation:TypeGeneration) {
    return generation.pokemons[Math.floor(Math.random() * generation.pokemons.length-1)];
}

export function fetchGenerations() {
    return generations;
}

export function fetchLanguages():TypeFullLanguage[]{
    return languages;   
}

export function fetchLanguage(name:string):TypeFullLanguage {
    return languages.find((l) => l.name === name) || languages[0];
}

export function fetchTypes():TypeFullTypes[] {
    return types;
}

export function getTrad(language:string, key:string|undefined, names: undefined|TypeName[], fallback: string="en") {
    if (!Array.isArray(names)) return "???";
    const trad = names.find((n) => n.language.name === language);
    if (trad) return trad.name;
    if (language !== fallback) return getTrad(fallback, key, names, fallback);
    return key || "???";
}

export function hasTrad(language:string, names: undefined|TypeName[], fallback: string="en") {
    if (!Array.isArray(names)) return false;
    let trad = names.find((n) => n.language.name === language);
    if (trad) return true;
    if (language !== fallback) return hasTrad(fallback, names, fallback);
    return false;
}

export function pokemonsToSpecies(pokemons: TypePokemon[]): TypePokemon[] {
    const speciesMap: { [key: string]: TypePokemon } = {};
    pokemons.forEach(pokemon => {
        if (pokemon.name === pokemon.specie_name) {
            speciesMap[pokemon.specie_id] = pokemon;
        } else if (!speciesMap[pokemon.specie_id]) {
            speciesMap[pokemon.specie_id] = pokemon;
        }
    });
    return Object.values(speciesMap);
}

export function getWeakness(type:TypeFullTypes, target:TypeFullTypes):number {
    if (type.damage_relations.double_damage_from.find((t)=>t.name == target.name))
        return 2;
    else if (type.damage_relations.half_damage_from.find((t)=>t.name == target.name))
        return 0.5;
    else if (type.damage_relations.no_damage_from.find((t)=>t.name == target.name))
        return 0;
    return 1;
}

export function getStrength(type:TypeFullTypes, target:TypeFullTypes):number {
    if (type.damage_relations.double_damage_to.find((t)=>t.name == target.name))
        return 2;
    else if (type.damage_relations.half_damage_to.find((t)=>t.name == target.name))
        return 0.5;
    else if (type.damage_relations.no_damage_to.find((t)=>t.name == target.name))
        return 0;
    return 1;
}

export function getWeaknesses(type: TypeFullTypes, combo: (TypeFullTypes|undefined)[]): number {
    if (!Array.isArray(combo) || !combo[0]) return 1;
    if (combo.length === 1) return getWeakness(type, combo[0]);
    let weakness = getWeakness(type, combo[0]);
    if (combo.length > 1) {
        combo.splice(1,combo.length).forEach((comboType) => {
            if (!comboType) return;
            weakness *= getWeakness(type, comboType);
        });
    }
    return weakness;
}

export function getStrengths(type: TypeFullTypes, combo:(TypeFullTypes|undefined)[]): number {
    if (!Array.isArray(combo) || !combo[0]) return 1;
    if (combo.length === 1) return getStrength(type, combo[0]);
    let strength = getStrength(type, combo[0]);
    if (combo.length > 1) {
        combo.splice(1,combo.length).forEach((comboType) => {
            if (!comboType) return;
            strength *= getStrength(type, comboType);
        });
    }
    return strength;
}

export const randomBetween = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}