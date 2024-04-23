import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../slices/ThemeSlice";
import emotionStyled from "@emotion/styled";

const Toggler = emotionStyled.button`
    font-size: 2em;
    background-color: transparent;
    border: none;
`;

export const ThemeToggle = () => {
    
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme);
    
    return (
        <Toggler
            onClick={() => {
                dispatch(setTheme(theme === "light" ? "dark" : "light"));
                localStorage.setItem('theme', theme === "light" ? "dark" : "light");
            }}
        >
            {theme === "light" ? "🌙" : "☀️"}
        </Toggler>
    )
}