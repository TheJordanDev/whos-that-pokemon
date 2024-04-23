import { useDispatch, useSelector } from "react-redux";
import { fetchGenerations, getTrad } from "../../data/helper";
import { TypeGeneration } from "../../types";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import emotionStyled from "@emotion/styled";
import { setGenerations } from "../../slices/GenerationSlice";

const GenerationList = emotionStyled.div`
    display: grid;
    grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
`;

export const AllGenerations = () => {
    
    const generations = fetchGenerations();

    return (
        <GenerationList>
            {generations.map((generation) => (
                <OneGeneration key={generation.gen} generation={generation}/>
            ))}
        </GenerationList>
    );
}

const StyledUl = emotionStyled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;    
    padding: 0;
    gap: 10px;
`;

const StyledLi = emotionStyled.li`
    list-style-type: none;
`;

type GenerationProps = {
    generation: TypeGeneration;
};

const OneGeneration = (props:GenerationProps) => {
    const language = useSelector((state: RootState) => state.language);
    const generations = useSelector((state: RootState) => state.generations);

    const dispatch = useDispatch();

    const toggleGeneration = (generation: TypeGeneration) => {
        const newGenerations = [...generations];
        const index = generations.findIndex((g) => g.gen === generation.gen);
        if (index === -1) newGenerations.push(generation);
        else newGenerations.splice(index, 1);
        newGenerations.sort((a, b) => a.gen.localeCompare(b.gen));
        dispatch(setGenerations(newGenerations));   
    }

    const [generationTrad, setGenerationTrad] = useState<string>();
    useEffect(() => {
        setGenerationTrad(getTrad(language, props.generation.gen, props.generation.names));
    }, [language, props.generation.names]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: "1 0 500px",
                border: "1px solid black",
                userSelect: "none",
                backgroundColor: generations.find((g) => g.gen === props.generation.gen) ? "lightblue" : "white",
            }}
            onClick={() => toggleGeneration(props.generation)}
        >
            <span>{generationTrad}</span>
            <StyledUl>
                {props.generation.versions.map((version) => (
                    <StyledLi key={version}>{version}</StyledLi>
                ))}
            </StyledUl>

        </div>
    );
}