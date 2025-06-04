import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function DiaryCard({ id, title, description, imgUrl }) {
    return (
        <div className="flex flex-col rounded-xl overflow-hidden shadow-lg shadow-slate-200 bg-white h-[400px] transition-transform hover:scale-[1.02] group">

            <div className="relative h-52 md:h-56 bg-cover bg-center" style={{ backgroundImage: `url(${imgUrl})` }}>

                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                    <a
                        href={`/diary/${id}`}
                        rel="noopener noreferrer"
                        className="h-12 w-12 flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white transition duration-300 shadow-md"
                        title="View Diary"
                    >
                        <EyeIcon className="h-6 w-6 text-white" />
                    </a>
                </div>
            </div>

            {/* Text Content */}
            <div className="p-4 flex flex-col justify-between flex-grow text-[#3E2C23]">
                <div>
                    <h5 className="text-xl font-semibold mb-2 text-[#A78BFA]">
                        {title}
                    </h5>
                    <p className="text-sm line-clamp-3">{description}</p>
                </div>
            </div>
        </div>
    );
}
