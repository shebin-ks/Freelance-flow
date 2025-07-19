import React from 'react';

interface LoadingIconProps {
    opacity?: number; 
    size?: number;    
    color?: string; 
}

const LoadingIcon: React.FC<LoadingIconProps> = ({
    opacity = 100,
    size = 5,
    color = 'text-gray-500',
}) => {
    const twSize = `h-${size} w-${size}`;
    const finalOpacity = opacity / 100;

    return (
        <svg
            className={`animate-spin ${twSize} ${color}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                style={{ opacity: finalOpacity }}
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
                style={{ opacity: finalOpacity }}
            />
        </svg>
    );
};

export default LoadingIcon;
