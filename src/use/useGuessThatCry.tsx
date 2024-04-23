import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { HistoryReason, usePokemonHistory } from "./usePokemonHistory";
import { useChoseGenerations } from "./useChoseGenerations";
import { TypePokemon } from "../types";
import { pokemonsToSpecies, shuffle } from "../data/helper";
import { useGuessThatCryChoices } from "./useGuessThatCryChoices";

export const useGuessThatCry = () => {

    const language = useSelector((state: RootState) => state.language);
    
    const [finishedChosing, setFinishedChosing] = useState(false);
    const {addPokemon, history, showHistory, setShowHistory} = usePokemonHistory();

    const [pokemons, setPokemons] = useState<TypePokemon[]>([]);
    const [remainingPokemons, setRemainingPokemons] = useState<TypePokemon[]>([]);
    const [currentPokemon, setCurrentPokemon] = useState<TypePokemon>();
    const [currentVolume, setCurrentVolume] = useState(1);

    const {choices, setChoices} = useGuessThatCryChoices();

    const playAudio = ()=> {
        if (finishedChosing) {
            if (currentPokemon) {
                let audio = new Audio(currentPokemon.cry.latest || currentPokemon.cry.legacy || "");
                audio.volume = currentVolume;
                audio.play();
            }
        }
    }

    const getRandomPokemon = (pokemons: TypePokemon[]) => {
        return pokemons[Math.floor(Math.random() * pokemons.length)];
    }
    
    const getChoices = (pokemons: TypePokemon[], currentPokemon: TypePokemon) => {
        let choicesSpecies = pokemons.filter((specie: TypePokemon) => specie.specie_id !== currentPokemon.specie_id);
        let choices:TypePokemon[] = [];
        while (choices.length < 3) {
            const choice = getRandomPokemon(choicesSpecies);
            if (!choices.includes(choice)) choices.push(choice);
        }
        if (currentPokemon) choices.push(currentPokemon);
        return shuffle(choices);
    }
    
    const startGame = async () => {
        if (selectedGenerations.length === 0) {
            alert("Please select at least one generation");
            return;
        }
        let _pokemons:any = allGenerations
            .filter((generation) => selectedGenerations.includes(generation))
            .map((generation) => generation.pokemons)
            .flat();
        let _pokemonsSpecies:TypePokemon[] = pokemonsToSpecies(_pokemons);
        _pokemonsSpecies = _pokemonsSpecies.filter((specie: TypePokemon) => {
            return specie.cry.legacy || specie.cry.latest;
        });
        setPokemons(_pokemonsSpecies);
        setRemainingPokemons(_pokemonsSpecies);
    
        let _currentPokemon = getRandomPokemon(_pokemonsSpecies);
    
        setCurrentPokemon(_currentPokemon);
        setChoices(getChoices(_pokemonsSpecies, _currentPokemon));
    
        setFinishedChosing(true);
    }
    
    function guessCry(guess:TypePokemon) {
        if (!currentPokemon) return;
        if (currentPokemon.specie_id === guess.specie_id) {
            addPokemon(guess, currentPokemon, HistoryReason.VALID);
            setRemainingPokemons(remainingPokemons.filter((p) => p.id !== currentPokemon.id));
        } else {
            addPokemon(guess, currentPokemon, HistoryReason.INVALID);
        }
    
        let _currentPokemon = getRandomPokemon(remainingPokemons);
    
        setCurrentPokemon(_currentPokemon);
        setChoices(getChoices(remainingPokemons, _currentPokemon));
    }

    const {selectedGenerations, allGenerations, toggleGeneration, generationsIco, renderChoices} = useChoseGenerations({language:language, finishCallback:startGame});

    return {
        language,
        selectedGenerations,
        allGenerations,
        toggleGeneration,
        generationsIco,
        finishedChosing,
        setFinishedChosing,
        addPokemon,
        history,
        showHistory,
        setShowHistory,
        pokemons,
        setPokemons,
        remainingPokemons,
        setRemainingPokemons,
        currentPokemon,
        setCurrentPokemon,
        choices,
        startGame,
        guessCry,
        playAudio,
        currentVolume,
        setCurrentVolume,
        renderChoices
    }   

}