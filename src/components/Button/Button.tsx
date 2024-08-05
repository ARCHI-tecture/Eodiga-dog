"use client";
import React from "react";

// variant에서 pink, green, red 중 하나를 선택해주세요. 기본값은 pink 입니다.
// 그 외에도 border, width, height 설정이 가능합니다.
// tailwindCSS 문법을 사용해주세요
// ex) <Button variant="green" width="w-40" border="rounded-2xl">example</Button>

const Button: React.FC<ButtonProps> = ({
    children,
    border = "rounded-lg",
    width = "w-max",
    height = "h-max",
    variant = "pink",
    onClick,
}) => {
    const variantStyles: variantStylesProps = {
        pink: `bg-main-pink text-white hover:border-main-pink hover:text-main-pink`,
        green: `bg-main-green text-white hover:border-main-green hover:text-main-green`,
        red: `bg-red-500 text-white hover:border-red-500 hover:text-red-500`,
        white: `bg-transparent text-black border border-gray`,
    };
    return (
        <>
            <button
                type="button"
                className={`${variantStyles[variant]} p-2 ${border} ${width} ${height} hover:border hover:bg-white flex justify-center items-center whitespace-nowrap`}
                onClick={onClick}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
