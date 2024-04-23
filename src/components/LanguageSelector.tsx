import { useMemo, useState } from "react"
import { fetchLanguages, getTrad } from "../data/helper"
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage, setLanguage } from "../slices/LanguageSlice";
import emotionStyled from "@emotion/styled";

const Select = emotionStyled.select`
    font-size: 1em;
    padding: 0.25em 1em;
    margin: 0.5em;
    border: 2px solid navy;
    border-radius: 10px;
    background-color: white;
`;

export const LanguageSelector = () => {
    const languages = useMemo(() => {return fetchLanguages()}, []);
    const [refresh, setRefresh] = useState(false);
    
    const dispatch = useDispatch();
    const language = useSelector((state: RootState) => state.language);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setLanguage(event.target.value));
        localStorage.setItem('language', event.target.value);
        setRefresh(!refresh);
    }

    return (
        <Select 
            onChange={handleChange}
            defaultValue={getLanguage(language)?.data?.name}
        >
            {languages.map((_language) => (
                <option key={_language.data.id} value={_language.data.name}>
                    {getTrad(_language.name, _language.data.name, _language.data.names)}
                </option>
            ))}
        </Select>
    )
}