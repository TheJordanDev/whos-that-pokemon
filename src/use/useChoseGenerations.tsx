import { useEffect, useMemo, useState } from "react";
import { fetchGenerations, getRandomPokemon, getTrad } from "../data/helper";
import { TypeGeneration, TypeLanguage } from "../types";
import emotionStyled from "@emotion/styled";

type GenMemoProps = {
    language:string;
    finishCallback:()=>Promise<void>;
}

const GenButton = emotionStyled.button`
    font-size: 1.5em;
    padding: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: unset;
    border-radius: 10px;
    margin: 10px;
    width: 150px;
    aspect-ratio: 1/1;
`;

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
                            <GenButton
                                key={generation.gen}
                                style={{
                                    backgroundColor: selectedGenerations.includes(generation) ? "green" : "white",
                                }}
                                onClick={() => {
                                    toggleGeneration(generation);
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "1rem",
                                        width: "100%",
                                        userSelect: "none",
                                    }}
                                >
                                    {getTrad(language, generation?.gen, generation?.names)}
                                </span>
                                <img
                                    style={{
                                        maxHeight: "100%",
                                        height: "100%",
                                        aspectRatio: "1/1",
                                        imageRendering: "pixelated",
                                        objectFit: "contain",
                                    }}
                                    src={src}
                                    alt={getTrad(language, generation?.gen, generation?.names)}
                                />
                            </GenButton>
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