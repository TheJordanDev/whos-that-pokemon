import { useState } from "react";
import { TypePokemon } from "../types";

export enum HistoryReason {
    VALID,
    INVALID,
    SKIP_NO_NAME,
}

export class PokemonHistoryItem {
    guess:TypePokemon|string;
    pokemon:TypePokemon;
    reason:HistoryReason;
    constructor(guess:TypePokemon|string,pokemon:TypePokemon, reason:HistoryReason) {
        this.guess = guess;
        this.pokemon = pokemon;
        this.reason = reason;
    }
}

export const usePokemonHistory = () => {

    const [history, setHistory] = useState<PokemonHistoryItem[]>([]);
    const [showHistory, setShowHistory] = useState<boolean>(false);

    const addPokemon = (guess:TypePokemon|string, pokemon:TypePokemon, reason:HistoryReason) => {
        setHistory([...history, new PokemonHistoryItem(guess, pokemon, reason)]);
    }

    const clearHistory = () => {
        setHistory([]);
    }

    return {
        history,
        addPokemon,
        showHistory,
        setShowHistory,
        clearHistory
    }

};