import { useMemo } from "react";
import RotatingText from "../Reactbits/RotatingText/RotatingText";

const names = [
    "Diary Lover",
    "Story Seeker",
    "Page Turner",
    "Memory Keeper",
    "Ink Wanderer",
    "Secret Reader",
    "Thought Collector",
    "Word Explorer",
    "Dream Catcher",
    "Note Whisperer",
    "Silent Listener",
    "Page Dancer",
    "Emotion Reader",
    "Quiet Observer",
    "Soul Reader",
];

const greetings = [
    "Hi",
    "Hello",
    "Hey",
    "Welcome",
    "Salam",
    "Halo",
    "Yo",
    "Hola",
];

function getRandomItem(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

export const Button = ({ diary }) => {
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(diary.meta.title)}%20app%20logo?width=500&height=500&nologo=true`;

    const greeting = useMemo(() => getRandomItem(greetings), []);
    const name = useMemo(() => getRandomItem(names), []);

    return (
        <div className="mt-4 mb-2 px-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                        src={pollinationsUrl}
                        alt="Wisata App Logo"
                        className="w-8 h-8 object-cover"
                    />
                </div>
                <div className="text-sm text-gray-700">
                    <span className="font-bold text-xl text-[#3E2C23] ml-1 mr-10">
                        <RotatingText
                            texts={[`${greeting}`, `${name}`, `${`${greeting} ${name}`}`]}
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
            </div>
        </div>
    );
};
