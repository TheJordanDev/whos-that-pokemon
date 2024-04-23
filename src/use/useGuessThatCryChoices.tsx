import { useState } from "react";
import { TypePokemon } from "../types";

export const useGuessThatCryChoices = () => {

    const [choice1, setChoice1] = useState<TypePokemon>();
    const [choice2, setChoice2] = useState<TypePokemon>();
    const [choice3, setChoice3] = useState<TypePokemon>();
    const [choice4, setChoice4] = useState<TypePokemon>();

    const setChoices = (choices:TypePokemon[]) => {
        setChoice1(choices[0]);
        setChoice2(choices[1]);
        setChoice3(choices[2]);
        setChoice4(choices[3]);
    }

    const choices:(TypePokemon|undefined)[] = [choice1, choice2, choice3, choice4];

    return {
        choice1,
        choice2,
        choice3,
        choice4,
        choices,
        setChoices
    }

}