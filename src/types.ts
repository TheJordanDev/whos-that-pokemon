export enum Types {
    normal = 'normal',
    fire = 'fire',
    water = 'water',
    electric = 'electric',
    grass = 'grass',
    ice = 'ice',
    fighting = 'fighting',
    poison = 'poison',
    ground = 'ground',
    flying = 'flying',
    psychic = 'psychic',
    bug = 'bug',
    rock = 'rock',
    ghost = 'ghost',
    dragon = 'dragon',
    dark = 'dark',
    steel = 'steel',
    fairy = 'fairy',
    shadow = 'shadow',
}

export function getTypeColor(type: TypeFullTypes) {
    switch (type.name) {
        case Types.normal: return '#A8A77A';
        case Types.fire: return '#EE8130';
        case Types.water: return '#6390F0';
        case Types.electric: return '#F7D02C';
        case Types.grass: return '#7AC74C';
        case Types.ice: return '#96D9D6';
        case Types.fighting: return '#C22E28';
        case Types.poison: return '#A33EA1';
        case Types.ground: return '#E2BF65';
        case Types.flying: return '#A98FF3';
        case Types.psychic: return '#F95587';
        case Types.bug: return '#A6B91A';
        case Types.rock: return '#B6A136';
        case Types.ghost: return '#735797';
        case Types.dragon: return '#6F35FC';
        case Types.dark: return '#705746';
        case Types.steel: return '#B7B7CE';
        case Types.fairy: return '#D685AD';
        case Types.shadow: return '#705746';
        default: return '#000000';
    }
}


export type TypeVersion = {
    "name": string,
    "url": string
}

export type TypeSmallTypes = {
    "name": string,
    "url": string
}

export type TypeFullTypes = {
    "id": number,
    "name": string,
    "names": TypeName[],
    "damage_relations": {
        "double_damage_from":TypeSmallTypes[],
        "double_damage_to":TypeSmallTypes[],
        "half_damage_from":TypeSmallTypes[],
        "half_damage_to":TypeSmallTypes[],
        "no_damage_from":TypeSmallTypes[],
        "no_damage_to":TypeSmallTypes[],
    },
}

export type TypeFullLanguage = {
    "name": string,
    "data": {
        "id": number,
        "iso3166": string,
        "iso639": string,
        "name": string,
        "names": TypeName[],
        "official": boolean,
    }
}

export type TypeLanguage = {
    "name": string,
    "url": string,
}

export type TypeFlavorText = {
    "flavor_text": string,
    "language": TypeLanguage,
    "version": TypeVersion,
}
export type TypeName = {
    name: string;
    language: {
        "name": string,
        "url": string,
    };
}

export type TypeSprite = {
    "front": string|null,
    "back": string|null,
}

export type TypePokemon = {
    "id": number,
    "specie_id": number,
    "specie_name": string,
    "name": string,
    "names": TypeName[],
    "types": string[],
    "flavor_text": TypeFlavorText[],
    "cry": {
        "latest": string|null,
        "legacy": string|null,
    },
    "sprites": TypeSprite,
}

export type TypeGeneration = {
    "gen": string,
    "names": TypeName[],
    "versions": string[],
    "pokemons": TypePokemon[],
}