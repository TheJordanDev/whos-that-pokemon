import emotionStyled from "@emotion/styled"
import { LanguageSelector } from "./LanguageSelector"
import { ThemeToggle } from "./ThemeToggle"
import { Link, useLocation } from "react-router-dom";

const HeaderStyle = emotionStyled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    background-color: #333;
    color: white;
    padding: 10px;
    top: 0;
    width: 100%;
    z-index: 100;
    background-color: var(--primary);
`;

export const Header = () => {

    const location = useLocation();
    const currentPage = location.pathname;


    return (
        <HeaderStyle>
                        <div
                style={{
                    gridRow: 1,
                    gridColumn: "span 2",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                {currentPage === "/" ? 
                    <h1
                        style={{ userSelect: "none"}}
                    >
                        Who's that Pokemon?
                    </h1> :
                    <h1>                        
                        <Link
                            style={{ cursor: "pointer", userSelect: "none", textDecoration: "none", color: "white"}}
                            to="/"
                            >
                            Who's that Pokemon?
                        </Link>
                    </h1>
                }
            </div>
            <div
                style={{
                    gridColumn: 1,
                    gridRow: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center"
                }}
            >
                <ThemeToggle/>
            </div>
            <div
                style={{
                    gridColumn: 2,
                    gridRow: 2,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center"
                }}
            >
                <LanguageSelector/>
            </div>
        </HeaderStyle>
    )
}