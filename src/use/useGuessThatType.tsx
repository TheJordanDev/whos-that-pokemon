import { useEffect, useState } from "react";
import { fetchTypes } from "../data/helper";
import { TypeFullTypes } from "../types";
import usePokemonTypes from "./usePokemonTypes";

export default function useGuessThatType() {
    
    const [types] = useState<TypeFullTypes[]>(fetchTypes().slice(0,fetchTypes().length-2));
    const lastTypes = usePokemonTypes();
    const currentTypes = usePokemonTypes();
    
    const getRandomTypes = () => {
        const randomTypes = types[Math.floor(Math.random() * types.length)];
        return randomTypes;
    }

    const updateTypes = () => {
        lastTypes.setType1(currentTypes.type1);
        lastTypes.setType2(currentTypes.type2);

        currentTypes.setType1(getRandomTypes());
        currentTypes.setType2(getRandomTypes());
    }

    useEffect(() => {
        updateTypes();
    }, []);

    
    return {
        types,
        lastTypes,
        currentTypes,
        updateTypes
    }
}