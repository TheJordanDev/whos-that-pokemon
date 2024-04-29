
import {  getStrengths, getTrad, getWeaknesses } from "../../data/helper"
import { TypeFullTypes, getTypeColor } from "../../types";
import emotionStyled from "@emotion/styled";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Button } from "../_partial/Button";
import useGuessThatType from "../../use/useGuessThatType";


const Table = emotionStyled.div`
    display: flex;
    gap: 5px;
    padding-block: 10px;
    width: 100%;
    border-radius: 10px;
    background-color: var(--background);
    color: var(--text);
`;

const Type = emotionStyled.div`
    color: var(--text);
    min-width: 7rem;
    div {
        &:first-child {
            border-radius: 10px 10px 0 0;
            background-color: ${(props:{color:string}) => props.color};
            span {
                padding-block: 5px;
                text-align: center;
                text-transform: uppercase;
                background-color: rgba(0,0,0,0.5);
                border-radius: 10px;
                width: 100%;
            }
        }
        &:last-child {
            &::before {
                content: "x";
            }
            border-radius: 0 0 10px 10px;
            border: 5px solid ${(props:{color:string}) => props.color};
        }
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

function TableEl(language: string, types: TypeFullTypes[], type: TypeFullTypes | undefined, callback: (type: TypeFullTypes, types: TypeFullTypes[]) => number, title = "Strength") {
    if (!type) return <></>;
    return (
        <div
            style={{
                position: "relative",
            }}
        >
            <h2 style={{ 
                textAlign: "center", 
            }}>
                {title}
            </h2>
            <Table>
                {
                    types.map((_type) => {
                        let multiplier = callback(_type, [type])
                        return (
                            <Type color={getTypeColor(_type)} key={_type.name}>
                                <div>
                                    <span>{getTrad(language,_type.name,_type.names)}</span>
                                </div>
                                <div>
                                    <span>{multiplier}</span>
                                </div>
                            </Type>
                        );
                    })
                }
            </Table>
        </div>
    )
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
            <div
                style={{
                    width: "100%",
                    overflow: "auto",
                    scrollBehavior: "smooth",
                    scrollbarWidth: "thin"
                }}
            >
                {
                    currentTypes.type1 && (
                        TableEl(language, types, currentTypes.type1, getStrengths)
                    )
                }

                {
                    currentTypes.type2 && (
                        TableEl(language, types, currentTypes.type2, getStrengths, "Strength 2")
                    )
                }

                {
                    TableEl(language, types, currentTypes.type1, getWeaknesses, "Weakness")
                }
            </div>

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
