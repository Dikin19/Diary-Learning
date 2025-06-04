import { useState } from 'react';
import { Link } from 'react-router-dom';
import RotatingText from '../Reactbits/RotatingText/RotatingText';

const pollinationsUrl = `https://image.pollinations.ai/prompt/wisata%20app%20logo?width=500&height=500&nologo=true`;

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Data tombol dengan link berbeda
    const buttons = [
        { label: "Popular Diaries", stars: "⭐", color: "#38BDF8", hover: "#0EA5E9", to: "/popular/1" },
        { label: "Popular Diaries", stars: "⭐⭐", color: "#F472B6", hover: "#EC4899", to: "/popular/2" },
        { label: "Popular Diaries", stars: "⭐⭐⭐", color: "#FDBA74", hover: "#F59E0B", to: "/popular/3" },
        { label: "Popular Diaries", stars: "⭐⭐⭐⭐", color: "#A78BFA", hover: "#7C3AED", to: "/popular/4" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#FFF7ED] border-b border-[#E5E7EB] shadow-sm z-50">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
                {/* Logo + Title */}
                <div className="flex items-center">
                    <img
                        src={pollinationsUrl}
                        alt="Wisata App Logo"
                        className="h-8 w-8 mr-3 rounded-full object-cover shadow-sm"
                    />
                    <span className="font-bold text-xl text-[#3E2C23] ml-1 mr-10">
                        <RotatingText
                            texts={["Wisata", "App", "Wisata App"]}
                            mainClassName="text-[#3E2C23] justify-center rounded-lg"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </span>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3E2C23]"
                    aria-label="Toggle menu"
                >
                    <svg
                        className="h-6 w-6 text-[#3E2C23]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                <div
                    className={`flex-col md:flex-row md:flex md:items-center w-full md:w-auto md:gap-3 absolute md:static top-16 left-0 md:top-auto bg-[#FFF7ED] md:bg-transparent border-t border-[#E5E7EB] md:border-none shadow-md md:shadow-none transition-transform duration-300 ease-in-out ${isOpen ? "flex translate-y-0" : "hidden md:flex"
                        }`}
                >
                    {buttons.map(({ label, stars, color, hover, to }, idx) => (
                        <Link key={idx} to={to}>
                            <button
                                className="text-white px-4 py-1 text-sm rounded-lg shadow-md transition mb-2 md:mb-0"
                                style={{ backgroundColor: color }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = hover}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = color}
                            >
                                {label} <span>{stars}</span>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
