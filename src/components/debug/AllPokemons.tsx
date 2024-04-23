import { useSelector } from "react-redux";
import { TypePokemon } from "../../types";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchTypes } from "../../data/helper";
import emotionStyled from "@emotion/styled";


const TYPES = fetchTypes();

const Sprite = emotionStyled.img`
    width: 96px;
    aspect-ratio: 1;
    image-rendering: pixelated;
`;

export const AllPokemons = () => {

    const generations = useSelector((state: RootState) => state.generations);

    const [pokemons, setPokemons] = useState<TypePokemon[]>([]);

    const setSelectedPokemons = () => {
        const _pokemons: TypePokemon[] = [];
        generations.forEach((generation) => {
            generation.pokemons.forEach((pokemon) => {
                if (pokemon.sprites.front || pokemon.sprites.back)
                    _pokemons.push(pokemon);
            });
        });
        setPokemons(_pokemons);
    }

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                flexDirection: "column",
                padding: "10px",
            }}
        >
            <button
                style={{
                    margin: "10px",
                    padding: "10px",
                    fontSize: "1em",
                    color: "white",
                    backgroundColor: "navy",
                    border: "2px solid",
                    borderRadius: "10px",
                }}
                
                onClick={() => setSelectedPokemons()}
            >
                Pokemons Des Générations
            </button>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: "10px 0",
                }}
            >
                {pokemons.map((pokemon) => (
                    <OnePokemon key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
}

type PokemonProps = {
    pokemon: TypePokemon;
};

const OnePokemon = ({pokemon}:PokemonProps) => {

    const language = useSelector((state: RootState) => state.language);

    const [nameTrad, setNameTrad] = useState<string>();

    let cry:HTMLAudioElement|null;

    const playCry = () => {
        if (pokemon.cry.legacy) cry = new Audio(pokemon.cry.legacy);
        else if (pokemon.cry.latest) cry = new Audio(pokemon.cry.latest);
        
        if (cry) cry.play();
    }

    useEffect(() => {
        setNameTrad(pokemon.names.find((name) => name.language.name === language)?.name);
    }, [language, pokemon.names]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "200px",
                backgroundColor: (pokemon.cry.legacy || pokemon.cry.latest) ? "lightblue" : "white",
            }}
            onClick={() => playCry()}
        >
            <span
                style={{
                    fontSize: "0.8em",
                    fontWeight: "bold",
                    color: "navy",
                    textAlign: "center",
                }}
            >{pokemon.name}</span>
            <h2
                style={{
                    margin:0,
                    textAlign: "center",
                }}
            >{nameTrad}</h2>
            <Sprite
                src={
                    pokemon.sprites.front ?? pokemon.sprites.back ?? ""
                }
                alt={nameTrad}
            />
        </div>
    );
}