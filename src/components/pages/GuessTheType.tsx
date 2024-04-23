
import {  getStrengths, getTrad, getWeaknesses } from "../../data/helper"
import { TypeFullTypes, getTypeColor } from "../../types";
import emotionStyled from "@emotion/styled";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Button } from "../_partial/Button";
import useGuessThatType from "../../use/useGuessThatType";

const Table = emotionStyled.table`
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
    padding: 10px;
    margin-bottom: 10px;
`;

const Th = emotionStyled.th`
    padding: 8px;
    text-align: center;
    font-size: 0.9em;
`;

const Td = emotionStyled.td`
    padding: 8px;
    text-align: center;
    &::before {
        content: 'x';
    }
`;

function StrengthTable(language:string, types:TypeFullTypes[], type:TypeFullTypes|undefined, title="Strength") {
    return (
    <Table>
        <caption>{title}</caption>
        <thead>
            <tr>
                {types.map((_type) => (
                    <Th 
                        style={{
                            backgroundColor: getTypeColor(_type),
                        }} 
                        key={_type.name}>{getTrad(language,_type.name,_type.names)}
                    </Th>
                ))}
            </tr>
        </thead>
        <tbody>
            <tr>
                {types.map((_type) => {
                    let multiplier = getWeaknesses(_type, [type])
                    return (
                        <Td key={_type.name}>{multiplier}</Td>
                    );
                })}
            </tr>
        </tbody>
    </Table>)
}

export const GuessTheType = () => {

    const {types, currentTypes, lastTypes, updateTypes} = useGuessThatType();
    const language = useSelector((state: RootState) => state.language)

    const help = () => {
        fetch('https://ntfy.sh/whosthatpokemon_debug', {
            method: 'POST',
            body: `${currentTypes.type1?.name} | ${currentTypes.type2?.name}`,
            headers: {
                'Title': 'WTP - Guess The Type',
            }
        })
    }

    if (types.length === 0 || !currentTypes.type1 || !currentTypes.type2) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>

            <div
                style={{
                    padding: "10px",
                    backgroundColor: "var(--background)",
                    color: "var(--text)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h1>
                    {getTrad(language, lastTypes.type1?.name, lastTypes.type1?.names)} | {getTrad(language, lastTypes.type2?.name, lastTypes.type2?.names)}
                </h1>
            </div>

            {
                currentTypes.type1 && (
                    StrengthTable(language, types, currentTypes.type1)
                )
            }

            {
                currentTypes.type2 && (
                    StrengthTable(language, types, currentTypes.type2, "Strength 2")
                )
            }

            <Table style={{marginTop:50}}>
                <caption>Weaknesses</caption>
                <thead>
                    <tr>
                        {types.map((type) => (
                            <Th 
                                style={{
                                    backgroundColor: getTypeColor(type),
                                }} 
                                key={type.name}>{getTrad(language,type.name, type.names)}
                            </Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {types.map((type) => {
                            let multiplier = getStrengths(type, [currentTypes.type1, currentTypes.type2])
                            return (
                                <Td key={type.name}>{multiplier}</Td>
                            );
                        })}
                    </tr>
                </tbody>
            </Table>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "10px",
                    gap: "10px"
                }}
            >
                <Button
                    onClick={() => { updateTypes() }}
                    style={{
                        width: "50%",
                        height: "80px",
                        fontSize: "1.5em",
                        border: "none",
                        borderRadius: "10px",
                        color: "var(--text-invert)",
                        backgroundColor: "var(--button)",
                    }}
                    hoverStyle={{
                        filter: "brightness(1.1)"
                    }}
                >
                    Change Types
                </Button>
                <Button
                    style={{
                        width: "50%",
                        height: "80px",
                        fontSize: "1.5em",
                        border: "none",
                        borderRadius: "10px",
                        color: "var(--text-invert)",
                        backgroundColor: "var(--button)",
                    }}
                    hoverStyle={{
                        filter: "brightness(1.1)"
                    }}
                    onClick={() => {
                        help();
                    }}
                >
                    Help
                </Button>
            </div>
        </>
    )
}
