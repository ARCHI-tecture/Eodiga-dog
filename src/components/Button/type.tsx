interface ButtonProps {
    children: React.ReactNode;
    border?: string;
    width?: number | string;
    height?: number | string;
    variant?: "pink" | "green" | "red" | "white";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface variantStylesProps {
    pink: string;
    green: string;
    red: string;
    white: string;
}
