import { useState } from "react";
import { HistoryReason, PokemonHistoryItem, usePokemonHistory } from "../../use/usePokemonHistory";
import { TypePokemon } from "../../types";
import { getTrad, getTypeGradient } from "../../data/helper";
import { useGuessThatCry } from "../../use/useGuessThatCry";
import { Button } from "../_partial/Button";

type HistoryModalProps = {
    lang: string;
    history:PokemonHistoryItem[];
    show:boolean;
    onClose:() => void;
}
const HistoryModal = (props:HistoryModalProps) => {
    const pokeArray = [...props.history].filter(i=>typeof i.guess !== "string").reverse();
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
                    maxHeight: "80%",
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
                        tableLayout: "fixed",
                    }}
                >
                    <thead>
                        <tr>
                            <th>Guess</th>
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
                                            {(item.guess as TypePokemon).name}
                                        </span>
                                        <img
                                            style={{
                                                width: "100%",
                                                maxWidth: "10em",
                                                aspectRatio: "1/1",
                                                imageRendering: "pixelated"
                                            }}
                                            title={getTrad(props.lang, (item.guess as TypePokemon).name, (item.guess as TypePokemon).names)}
                                            src={(item.guess as TypePokemon).sprites?.front || ""}
                                            alt={(item.guess as TypePokemon).name}
                                        />
                                    </div>
                                </td>
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
                                                width: "100%",
                                                maxWidth: "10em",
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

export const GuessTheCry = () => {

    const {
        language,
        finishedChosing,
        history,
        showHistory,
        setShowHistory,
        currentPokemon,
        choices,
        guessCry,
        playAudio,
        currentVolume,
        setCurrentVolume,
        renderChoices
    } = useGuessThatCry();

    const [showTypes, setShowTypes] = useState(false);

    if (!finishedChosing) {
        return [renderChoices];
    }

    return (
        <>
        <div
            style={{
                position: "absolute",
                top: "1em",
                left: "1em",
            }}
        >
            <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={currentVolume}
                onChange={(e) => {
                    if (currentVolume) {
                        setCurrentVolume(Number(e.target.value));
                    }
                }}
            />
        </div>
        <button
            style={{ position: "absolute", top: "1em", right: "1em", border: "none", padding: "1em", borderRadius: "1em"}}
            onClick={() => { setShowHistory(true); }}
        >
            History
        </button>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px"
            }}
        >
            <input
                type="checkbox"
                checked={showTypes}
                onChange={() => setShowTypes(!showTypes)}
            />
            <Button
                onClick={() => playAudio() }
                style={{
                    fontSize: "1.5em",
                    padding: "10px",
                    border: "none",
                    width: "50%",
                    aspectRatio: "1/1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: (showTypes ? getTypeGradient(currentPokemon as TypePokemon) : "white")
                }}
                hoverStyle={{
                    filter: "brightness(0.8)"
                }}
            >
                <img
                    src="/play-solid.svg"
                    alt="play"
                    style={{
                        width: "100px",
                        height: "100px",
                        imageRendering: "pixelated"
                    }}
                />
            </Button>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "1fr 1fr",
                    gap: "10px",
                }}
            >
                {choices.map((choice:TypePokemon|undefined, index:number) => {
                    return (
                        <Button
                            key={index}
                            onClick={() => {
                                if (choice) guessCry(choice);
                            }}
                            style={{
                                fontSize: "1.5em",
                                padding: "10px",
                                border: "none",
                                background: getTypeGradient(choice as TypePokemon),
                            }}
                            hoverStyle={{
                                filter: "brightness(0.8)"
                            }}
                        >                            
                            <img
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    imageRendering: "pixelated"
                                }}
                                src={choice?.sprites?.front || choice?.sprites?.back || ""}
                                alt={choice?.name}
                            />
                        </Button>
                    );
                })}
            </div>
        </div>
        <HistoryModal lang={language} history={history} show={showHistory} onClose={() => setShowHistory(false)} />
        </>
    );
}