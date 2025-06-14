import { useEffect, useRef } from "react";

export default function TiktokEmbed({ url }) {
    // console.log('TiktokEmbed :', url)

    const containerRef = useRef();

    const cleanUrl = (rawUrl) => {
        if (!rawUrl) return "";
        return rawUrl.replace(/\\/g, "").trim(); // Menghapus tanda \ (backslash) dari URL jika ada (kadang error parsing).
    };

    const safeUrl = cleanUrl(url);
    // console.log('url', safeUrl)


    const match = safeUrl.match(/\/video\/(\d+)/); // mencari video
    const videoId = match ? match[1] : null;

    if (!videoId) return null;

    const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}`;

    useEffect(() => {

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
