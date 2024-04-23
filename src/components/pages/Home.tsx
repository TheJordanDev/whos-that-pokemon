import { Link } from "react-router-dom";

export const Home = () => {

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex:1,
                gap: "10px"
            }}
        >
            <Link
                to="/type"
                style={{textDecoration: "none", width: "100%"}}
            >
                <button
                    style={{
                        fontSize: "1.5em",
                        padding: "10px",
                        width: "100%"
                    }}
                >
                        Guess the type
                </button>
            </Link>
            <Link
                to="/silhouette"
                style={{textDecoration: "none", width: "100%"}}
            >
                <button
                    style={{
                        fontSize: "1.5em",
                        padding: "10px",
                        width: "100%"
                    }}
                >
                        Guess the silhouette
                </button>
            </Link>
            <Link
                to="/cry"
                style={{textDecoration: "none", width: "100%"}}
            >
                <button
                    style={{
                        fontSize: "1.5em",
                        padding: "10px",
                        width: "100%"
                    }}
                >
                        Guess the cry
                </button>
            </Link>
        </div>
    );
}