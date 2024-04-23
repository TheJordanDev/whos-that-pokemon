import { useState } from "react"

type ButtonProps = {
    onClick: () => void;
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button = (props:ButtonProps) => {

    const [hover, setHover] = useState(false);

    return (
        <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={props.onClick}
            style={{
                ...props.style,
                ...(hover && props.hoverStyle)
            }}
        >
            {props.children}
        </button>
    )

}