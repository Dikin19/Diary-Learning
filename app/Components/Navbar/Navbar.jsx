import { Link } from 'react-router-dom';
import RotatingText from '../Reactbits/RotatingText/RotatingText';

const pollinationsUrl = `https://image.pollinations.ai/prompt/wisata%20app%20logo?width=500&height=500&nologo=true`;


export default function Navbar() {
    return (
        <nav className="w-full bg-[#FFF7ED] border-b border-[#E5E7EB] shadow-sm fixed top-0 left-0 z-50">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
                {/* Logo + Title */}
                <div className="flex items-center">
                    <img
                        src={pollinationsUrl}
                        alt="Wisata App Logo"
                        className="h-8 w-8 mr-3 rounded-full object-cover shadow-sm"
                    />
                    <span className="font-bold text-xl ml-1 text-[#3E2C23]">
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

                <div className="flex flex-wrap gap-3">
                    <Link to="/">
                        <button className="bg-[#38BDF8] hover:bg-[#0EA5E9] text-white px-4 py-1 text-sm rounded-lg shadow-md transition">
                            Popular Diaries <span>⭐</span>
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="bg-[#F472B6] hover:bg-[#EC4899] text-white px-4 py-1 text-sm rounded-lg shadow-md transition">
                            Popular Diaries <span>⭐⭐</span>
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="bg-[#FDBA74] hover:bg-[#F59E0B] text-white px-4 py-1 text-sm rounded-lg shadow-md transition">
                            Popular Diaries <span>⭐⭐⭐</span>
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="bg-[#A78BFA] hover:bg-[#7C3AED] text-white px-4 py-1 text-sm rounded-lg shadow-md transition">
                            Popular Diaries <span>⭐⭐⭐⭐</span>
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
