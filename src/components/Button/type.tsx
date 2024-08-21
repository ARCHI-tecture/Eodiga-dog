import Bookmark from "../../containers/bookmark/bookmark";
export interface ButtonProps {
    children: React.ReactNode;
    border?: string;
    width?: number | string;
    height?: number | string;
    variant?: "pink" | "green" | "red" | "white";
    style?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface variantStylesProps {
    pink: string;
    green: string;
    red: string;
    white: string;
}

export interface LikeButtonProps {
    liked?: boolean;
    item: any; //수정필요
    removeBookmark?: (id: number) => void;
}
