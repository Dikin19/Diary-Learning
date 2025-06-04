import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { getDiaryById } from "../store/ProductSlice";
import { renderDiaryContent, getDiaryContentSEOAttributes, getSizeOptimizedImageUrl } from "../../utils/cms.js";

import YoutubeEmbed from "../Components/Embed/YoutubeEmbed.jsx";
import InstagramEmbed from "../Components/Embed/InstagramEmbed.jsx";
import TwitterEmbed from "../Components/Embed/TwitterEmbed.jsx";
import TiktokEmbed from "../Components/Embed/TiktokEmbed.jsx";
import Navbarr from "../Components/Navbar/Navbar";
import CircularText from "../Components/Reactbits/CircularText/CircularText";

function sanitizeTextContent(text) {
    if (!text) return "";

    const escapedText = text
        .replace(/\\\./g, ".")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/__(.*?)__/g, "<em>$1</em>")
        .replace(/\n/g, "<br/>")
        .replace(/(\bhttps?:\/\/[^\s<]+\.(?:jpg|jpeg|png|webp|gif))/gi, "")
        .replace(
            /(\bhttps?:\/\/[^\s<]+)/g,
            '<a href="$1" class="text-blue-600 underline hover:text-blue-800 transition-colors break-words" target="_blank" rel="noopener noreferrer">$1</a>'
        );

    return escapedText.trim();
}

function RenderImage({ src, alt = "Image", optimize = true }) {
    const optimizedUrl = optimize ? getSizeOptimizedImageUrl(src, "md") : src; // 'md' untuk ukuran medium
    return (
        <div className="flex justify-center my-6">
            <img
                src={optimizedUrl || "/fallback-image.png"}
                alt={alt}
                className="w-full max-w-xl rounded-xl my-6 shadow-sm object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback-image.png";
                }}
            />
        </div>
    );
}


export default function DiaryContent() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { detail: response, isLoading, error } = useSelector((state) => state.product);

    useEffect(() => {
        if (id) dispatch(getDiaryById(id));
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-90 z-50">
                <CircularText
                    text="LOADING * PLEASE WAIT *"
                    onHover="speedUp"
                    spinDuration={70}
                    className="absolute mt-4 ml-4"
                    color="#6366F1"
                />
            </div>
        );
    }

    if (error) {
        return (
            <p className="text-red-600 text-center mt-16 font-semibold text-lg">
                {error}
            </p>
        );
    }

    const diary = response?.content?.[0];
    if (!diary) {
        return (
            <p className="text-center mt-20 text-gray-700 text-lg font-medium">
                Diary tidak ditemukan.
            </p>
        );
    }

    const rendered = renderDiaryContent(diary);
    const seo = getDiaryContentSEOAttributes(diary);

    return (
        <>
            <Helmet>
                <title>{seo.title || "Your Diary"}</title>
                <meta name="description" content={seo.description || ""} />
                <meta name="keywords" content={seo.keywords || ""} />
                <meta name="author" content={seo.author || "Redaksi"} />
                <meta property="og:title" content={seo.title || "Your Diary"} />
                <meta property="og:description" content={seo.description || ""} />
                {seo.image && <meta property="og:image" content={seo.image} />}
                <meta property="article:published_time" content={seo.publishedTime || ""} />
            </Helmet>

            <div className="min-h-screen overflow-x-hidden bg-[#FFF7ED] text-[#3E2C23] px-4 md:px-20">
                <Navbarr />

                <h1 className="text-5xl font-extrabold mb-8 leading-tight tracking-tight text-indigo-600 drop-shadow-sm">
                    {diary.meta?.title || "Tanpa Judul"}
                </h1>

                <div className="flex flex-wrap text-gray-500 text-sm mb-10 space-x-6">
                    <p>
                        <span className="font-semibold">Status:</span>{" "}
                        <span className="text-pink-600">{diary.status}</span>
                    </p>
                    <p>
                        <span className="font-semibold">Dibuat:</span>{" "}
                        {new Date(diary.created_dt).toLocaleString(undefined, {
                            dateStyle: "long",
                            timeStyle: "short",
                        })}
                    </p>
                </div>

                <article className="prose prose-lg prose-indigo max-w-none leading-relaxed text-gray-800">
                    {rendered.contentBlocks.map((block, idx) => {
                        switch (block.type) {
                            case "paragraph": {
                                // Embed detection
                                const match = block.text.match(
                                    /<(YoutubeEmbed|InstagramEmbed|TiktokEmbed|TwitterEmbed)\s+url="([^"]+)"\s*\/?>/
                                );
                                if (match) {
                                    const [, type, url] = match;
                                    switch (type) {
                                        case "YoutubeEmbed":
                                            return (
                                                <div key={idx} className="max-w-xl mx-auto my-6">
                                                    <YoutubeEmbed url={url} />
                                                </div>
                                            );
                                        case "InstagramEmbed":
                                            return (
                                                <div key={idx} className="max-w-lg mx-auto my-6">
                                                    <InstagramEmbed url={url} />
                                                </div>
                                            );
                                        case "TiktokEmbed":
                                            return (
                                                <div key={idx} className="max-w-xl mx-auto my-6">
                                                    <TiktokEmbed url={url} />
                                                </div>
                                            );
                                        case "TwitterEmbed":
                                            return (
                                                <div key={idx} className="flex justify-center my-6 max-w-xl mx-auto my-6">
                                                    <TwitterEmbed tweetId={url} />
                                                </div>
                                            );
                                        default:
                                            return (
                                                <p key={idx} className="text-red-500">
                                                    Embed tidak didukung
                                                </p>
                                            );
                                    }
                                }

                                return (
                                    <p
                                        key={idx}
                                        dangerouslySetInnerHTML={{ __html: sanitizeTextContent(block.text) }}
                                        className="mb-7 text-lg leading-relaxed tracking-wide"
                                    />
                                );
                            }

                            case "heading":
                                if (block.level === 3) {
                                    return (
                                        <h3
                                            key={idx}
                                            className="text-3xl font-semibold mt-14 mb-6 text-indigo-600 border-l-4 border-yellow-400 pl-5"
                                            dangerouslySetInnerHTML={{ __html: sanitizeTextContent(block.text) }}
                                        />
                                    );
                                }
                                return null;

                            case "list":
                                return (
                                    <ul
                                        key={idx}
                                        className="list-disc list-inside mb-10 space-y-3 text-gray-800 text-lg"
                                        style={{ listStyleType: "disc", listStylePosition: "inside" }}
                                    >
                                        {block.items.map((item, i) => (
                                            <li
                                                key={i}
                                                dangerouslySetInnerHTML={{ __html: sanitizeTextContent(item) }}
                                            />
                                        ))}
                                    </ul>
                                );

                            case "image":
                                return <RenderImage key={idx} src={block.url} alt="Diary Image" />;

                            case "youtube":
                                return <YoutubeEmbed key={idx} url={block.url} />;

                            case "instagram":
                                return <InstagramEmbed key={idx} url={block.url} />;

                            case "twitter":
                                return <TwitterEmbed key={idx} tweetId={block.tweetId} />;

                            case "tiktok":
                                return <TiktokEmbed key={idx} url={block.url} />;

                            default:
                                return null;
                        }
                    })}

                    <footer className="mt-16 border-t pt-6 text-sm text-gray-500 italic">
                        Terakhir diperbarui pada:{" "}
                        {new Date(diary.updated_dt || diary.created_dt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </footer>
                </article>
            </div>
        </>
    );
}
