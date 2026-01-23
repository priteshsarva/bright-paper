import { useEffect, useState } from 'react';

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Set a minimum loading time of 1.5 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="text-center">
                {/* Animated Logo/Brand Name */}
                <div className="mb-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-2">
                        <span className="text-[#F36B2C] inline-block animate-fade-in-up">Bright</span>
                        <span className="text-[#5A8F2E] inline-block animate-fade-in-up animation-delay-200">Paper</span>
                    </h1>
                    <p className="text-neutral-600 text-lg animate-fade-in-up animation-delay-400">
                        Manufacturing Excellence
                    </p>
                </div>

                {/* Spinner Animation */}
                <div className="relative w-20 h-20 mx-auto">
                    {/* Outer Ring - Orange */}
                    <div className="absolute inset-0 border-4 border-[#F36B2C] border-t-transparent rounded-full animate-spin"></div>

                    {/* Inner Ring - Green */}
                    <div className="absolute inset-2 border-4 border-[#5A8F2E] border-b-transparent rounded-full animate-spin-reverse"></div>

                    {/* Center Dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-gradient-to-br from-[#F36B2C] to-[#5A8F2E] rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="mt-6">
                    <div className="flex items-center justify-center space-x-1">
                        <span className="text-neutral-600 font-medium">Loading</span>
                        <span className="animate-bounce animation-delay-0">.</span>
                        <span className="animate-bounce animation-delay-200">.</span>
                        <span className="animate-bounce animation-delay-400">.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
