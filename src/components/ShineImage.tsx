import React from 'react';

interface ShineImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    containerClassName?: string;
}

export default function ShineImage({ containerClassName = '', className = '', ...props }: ShineImageProps) {
    return (
        <div className={`shine-wrapper ${containerClassName}`}>
            <img className={`block w-full h-auto ${className}`} {...props} />
        </div>
    );
}
