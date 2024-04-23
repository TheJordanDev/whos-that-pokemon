import { AllGenerations } from "./AllGenerations";
import { AllPokemons } from "./AllPokemons";
import { AllTypes } from "./AllTypes";

export const Debug = () => {
    return (
        <>
            <AllTypes />
            <br/>
            <AllGenerations />
            <br/>
            <AllPokemons />
        </>
    );
}