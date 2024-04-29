import { useMemo, useState } from "react";
import { useChoseGenerations } from "../../use/useChoseGenerations";
import { TypePokemon } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getTrad, hasTrad } from "../../data/helper";
import { HistoryReason, PokemonHistoryItem, usePokemonHistory } from "../../use/usePokemonHistory";

type HistoryModalProps = {
    lang: string;
    history:PokemonHistoryItem[];
    show:boolean;
    onClose:() => void;
}
const HistoryModal = (props:HistoryModalProps) => {
    const pokeArray = [...props.history].reverse();
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                color: "black",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: props.show ? "block" : "none"
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    props.onClose();
                }
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    minHeight: "50%",
                    maxHeight: "90%",
                    width: "90%",
                    overflow: "auto",
                    scrollbarWidth: "thin"
                }}
            >
                <h1>History</h1>
                <button
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        border: "none",
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px",
                        borderRadius: "10px"
                    }}
                    onClick={props.onClose}
                >
                    Close
                </button>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "fixed",
                    }}
                >
                    <thead>
                        <tr>
                            <th>✔️</th>
                            <th>❌</th>
                            <th>❓</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.history.filter(h=>h.reason === HistoryReason.VALID).length}</td>
                            <td>{props.history.filter(h=>h.reason === HistoryReason.INVALID).length}</td>
                            <td>{props.history.filter(h=>h.reason === HistoryReason.SKIP_NO_NAME).length}</td>
                        </tr>
                    </tbody>
                </table>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr>
                            <th>Pokemon</th>
                            <th>Valid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokeArray.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            position: "relative"
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: ".8em",
                                                textAlign: "center",
                                                position: "absolute",
                                                top: "0",
                                                left: "0",
                                            }}
                                        >
                                            {item.pokemon.name}
                                        </span>
                                        <img
                                            style={{
                                                width: "10em",
                                                aspectRatio: "1/1",
                                                imageRendering: "pixelated"
                                            }}
                                            title={getTrad(props.lang, item.pokemon.name, item.pokemon.names)}
                                            src={item?.pokemon?.sprites?.front || ""}
                                            alt={item.pokemon.name}
                                        />
                                    </div>
                                </td>
                                <td
                                    style={{
                                        fontSize: "2em",
                                        textAlign: "center"
                                    }}
                                >{item.reason == HistoryReason.VALID ? "✔️" : (item.reason == HistoryReason.INVALID ? "❌" : "❓")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const GuessTheSilhouette = () => {

    const language = useSelector((state: RootState) => state.language);
    
    const [finishedChosing, setFinishedChosing] = useState(false);
    const {addPokemon, history, showHistory, setShowHistory} = usePokemonHistory();

    const [pokemons, setPokemons] = useState<TypePokemon[]>([]);
    const [currentPokemon, setCurrentPokemon] = useState<TypePokemon>();
    const [showPokemon, setShowPokemon] = useState(false);
    const [guess, setGuess] = useState("");

    const pokemonDataList = useMemo(() => {
        return pokemons
            .sort((a,b)=>getTrad(language,a.name,a.names).localeCompare(getTrad(language, b.name, b.names)))
            .flatMap((pokemon:TypePokemon) => {
                return (
                    <option key={pokemon.name} value={getTrad(language, pokemon.name, pokemon.names)} />
                )
            }
        );
    }, [language, pokemons]);

    const pokemonNameIdMapping = useMemo(() => {
        const mapping:{[key:string]:string} = {};
        pokemons.forEach(pokemon => {
            const translatedName = getTrad(language, pokemon.name, pokemon.names);
            mapping[translatedName] = pokemon.name;
        });
        return mapping;
    }, [language, pokemons]);

    async function startGame() {
        if (selectedGenerations.length === 0) {
            alert("Please select at least one generation");
            return;
        }
        let newPokemons:TypePokemon[] = [];
        for (let generation of selectedGenerations) {
            for (let pokemon of generation.pokemons) {
                if (pokemon?.sprites?.front) {
                    newPokemons.push(pokemon);
                }
            }
        }
        setPokemons(newPokemons);
        let randomPokemon = newPokemons[Math.floor(Math.random() * newPokemons.length)];
        setCurrentPokemon(randomPokemon);     
        setFinishedChosing(true);
    }

    function guessPokemon() {
        if (currentPokemon) {
            const pokemonName = pokemonNameIdMapping[guess];
            let valid = false;
            let actualGuess:string|TypePokemon = guess;
    
            if (hasTrad(language, currentPokemon.names)) {
                valid = currentPokemon.name.toLowerCase() === pokemonName.toLowerCase();
                actualGuess = pokemons.find(p => p.name === pokemonName) || guess;
            }
    
            addPokemon(actualGuess, currentPokemon, valid ? HistoryReason.VALID : HistoryReason.INVALID);
        }
    
        setShowPokemon(false);
    
        let newPokemons = pokemons.filter(p => p !== currentPokemon);
        let randomPokemon = newPokemons[Math.floor(Math.random() * newPokemons.length)];
    
        while (!hasTrad(language, randomPokemon.names)) {
            addPokemon(randomPokemon, randomPokemon, HistoryReason.SKIP_NO_NAME);
            newPokemons = newPokemons.filter(p => p !== randomPokemon);
            randomPokemon = newPokemons[Math.floor(Math.random() * newPokemons.length)];
        }
    
        setPokemons(newPokemons);
        setCurrentPokemon(randomPokemon);
        setGuess("");
    }

    function getCurrentName() {
        return getTrad(language, currentPokemon?.name, currentPokemon?.names);
    }

    const {selectedGenerations, renderChoices} = useChoseGenerations({language:language,finishCallback:startGame});

    if (!finishedChosing) {
        return [renderChoices];
    }

    return (
        <>
        <button
            style={{ position: "absolute", top: "10px", right: "10px", border: "none", padding: "10px", borderRadius: "10px"}}
            onClick={() => { setShowHistory(true); }}
        >
            History
        </button>
        <div>
            <h1>Guess the silhouette</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px"
                }}
            >
                <img
                    style={{
                        width: "200px",
                        aspectRatio: "1/1",
                        imageRendering: "pixelated",
                        filter: (showPokemon ? "none" : "brightness(0)"),
                        userSelect: "none",
                        border: (getCurrentName() === currentPokemon?.name ? "5px solid orange" : "unset")
                    }}
                    draggable={false}
                    onClick={() => { setShowPokemon(!showPokemon); }}
                    src={currentPokemon?.sprites?.front || ""}
                />
                <datalist id="pokemonList">
                    {pokemonDataList}
                </datalist>
                <input
                    type="text"
                    style={{
                        fontSize: "1.5em",
                        padding: "10px",
                        width: "100%",
                        border: "none",
                        borderRadius: "10px",
                        textAlign: "center"
                    }}
                    value={guess}
                    onChange={(event) => { setGuess(event.target.value); }}
                    list="pokemonList"
                    onKeyDown={(key) => { 
                        if (key.key === "Enter" && currentPokemon) {
                            guessPokemon(); 
                        }
                    }}
                />
            </div>
        </div>
        <HistoryModal lang={language} history={history} show={showHistory} onClose={() => {setShowHistory(false)}}/>
        </>
    )

}