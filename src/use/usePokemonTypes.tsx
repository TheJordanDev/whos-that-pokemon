import { useState } from "react";
import { TypeFullTypes } from "../types";

export default function usePokemonTypes() {
    
    const [type1, setType1] = useState<TypeFullTypes>();
    const [type2, setType2] = useState<TypeFullTypes>();
    
    return {
        type1,
        setType1,
        type2,
        setType2
    }
}