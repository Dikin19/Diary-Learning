import { useEffect, useRef } from "react";

export default function TiktokEmbed({ url }) {
    const containerRef = useRef();

    // Fungsi bersihkan URL, hapus backslash dan whitespace
    const cleanUrl = (rawUrl) => {
        if (!rawUrl) return "";
        return rawUrl.replace(/\\/g, "").trim();
    };

    const safeUrl = cleanUrl(url);

    // Ambil videoId dari URL TikTok
    const match = safeUrl.match(/\/video\/(\d+)/);
    const videoId = match ? match[1] : null;

    if (!videoId) return null;

    const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}`;

    useEffect(() => {
        // bisa ditambah jika ada skrip TikTok yang harus dimuat
    }, [videoId]);

    return (
        <div ref={containerRef} className="my-6 flex justify-center">
            <div className="w-full max-w-md aspect-[9/16]">
                <iframe
                    src={embedUrl}
                    className="w-full h-full rounded-lg"
                    scrolling="no"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="TikTok Video"
                    frameBorder="0"
                />
            </div>
        </div>
    );
}
