import { useSelector } from "react-redux";
import { fetchTypes, getTrad } from "../../data/helper";
import { RootState } from "../../store";
import { TypeFullTypes, Types, getTypeColor } from "../../types";
import { useEffect, useState } from "react";

type TypeProps = {
    type: TypeFullTypes;
};

const OneType = (props:TypeProps) => {

    const language = useSelector((state: RootState) => state.language);

    const [typeTrad, setTypeTrad] = useState<string>();

    useEffect(() => {
        setTypeTrad(getTrad(language, props.type.name, props.type.names));
    }, [language, props.type.names]);

    return (
        <div
        style={{
            backgroundColor: getTypeColor(props.type),
            width: '100px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: 'none',
        }}
        onMouseEnter={() => {
            if (typeTrad) document.title = typeTrad;
        }}
        onMouseLeave={() => {
            document.title = "Type Colors";
        }}
        >
            {typeTrad}
        </div>
    );
}

export const AllTypes = () => {

    const types = fetchTypes();

    const getByName = (name:string) => {
        return types.find((type) => type.name === name);
    }

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }}>
            {
                Object.values(Types).map((type) => {
                    let _type = getByName(type);
                    if (!_type) return null;
                    return (
                        <OneType key={type} type={_type} />
                    );
                })
            }
        </div>
    );
};