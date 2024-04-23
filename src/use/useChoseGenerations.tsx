import { useEffect, useMemo, useState } from "react";
import { fetchGenerations, getRandomPokemon, getTrad } from "../data/helper";
import { TypeGeneration, TypeLanguage } from "../types";

type GenMemoProps = {
    language:string;
    finishCallback:()=>Promise<void>;
}

export const useChoseGenerations = ({language, finishCallback}:GenMemoProps) => {
    const [allGenerations, setAllGenerations] = useState<TypeGeneration[]>([]);
    const [selectedGenerations, setSelectedGenerations] = useState<TypeGeneration[]>([]);
    const [generationsIco, setGenerationsIco] = useState<Map<TypeGeneration, string>>(new Map());

    const toggleGeneration = (generation: TypeGeneration) => {
        if(selectedGenerations.includes(generation)) {
            setSelectedGenerations(selectedGenerations.filter(g => g !== generation));
        } else {
            setSelectedGenerations([...selectedGenerations, generation]);
        }
    }

    useEffect(() => {
        setAllGenerations(fetchGenerations());
    },[]);

    useEffect(() => {
        let map:Map<TypeGeneration, string> = new Map();
        for (let generation of allGenerations) {
            let randomStarter = getRandomPokemon(generation);
            while(!randomStarter?.sprites?.front) {
                randomStarter = getRandomPokemon(generation);
            }
            let src = randomStarter?.sprites?.front || "";
            map.set(generation, src);
        }
        setGenerationsIco(map);
    },[allGenerations]);

    const renderChoices = useMemo(() => {
        return (
            <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {allGenerations.map((generation:TypeGeneration) => {
                        let src = generationsIco.get(generation) || "";
                        return (
                            <button
                                key={generation.gen}
                                style={{
                                    fontSize: "1.5em",
                                    padding: "10px",
                                    backgroundColor: selectedGenerations.includes(generation) ? "green" : "white",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "unset",
                                    borderRadius: "10px",
                                    margin: "10px"
                                }}
                                onClick={() => {
                                    toggleGeneration(generation);
                                }}
                            >
                                {getTrad(language, generation?.gen, generation?.names)}
                                <img
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        imageRendering: "pixelated"
                                    }}
                                    src={src}
                                    alt={getTrad(language, generation?.gen, generation?.names)}
                                />
                            </button>
                        )
                    })}
                </div>
                <button
                    style={{
                        fontSize: "1.5em",
                        padding: "10px",
                        border: "none",
                        width: "50%",
                    }}
                    onClick={async () => {
                        await finishCallback();
                    }}
                >
                    Continue
                </button>
            </div>
            </>
        );
    }, [selectedGenerations, allGenerations, generationsIco]);

    return {
        selectedGenerations,
        allGenerations,
        generationsIco,
        toggleGeneration,
        renderChoices
    }
}