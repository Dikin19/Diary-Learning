import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { getDiaryById } from "../store/ProductSlice";
import { renderDiaryContent, getDiaryContentSEOAttributes, getSizeOptimizedImageUrl } from "../../utils/cms.js";

import YoutubeEmbed from "../Components/Embed/YoutubeEmbed.jsx";
// import InstagramEmbed from "../../app/Components/InstagramEmbed";
// import TwitterEmbed from "../../app/Components/TwitterEmbed";
// import TiktokEmbed from "../../app/Components/TiktokEmbed";
import Navbarr from "../Components/Navbar/Navbar";
import CircularText from "../Components/Reactbits/CircularText/CircularText";

// Helper
function sanitizeTextContent(text) {
    if (!text) return '';
    return text
        .replace(/\\\./g, '.')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .trim();
}

// Image component
function RenderImage({ src, alt }) {
    const optimizedUrl = getSizeOptimizedImageUrl(src, '600x');
    return (
        <img
            src={optimizedUrl || '/fallback-image.png'}
            alt={alt || 'Image'}
            className="w-full rounded-lg my-4"
            loading="lazy"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/fallback-image.png';
            }}
        />
    );
}

export default function DiaryContent() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const diaryResponse = useSelector((state) => state.product.detail);
    const isLoading = useSelector((state) => state.product.isLoading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        dispatch(getDiaryById(id));
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
                <CircularText
                    text="WAIT * FOR LOADING * CONNECTION * "
                    onHover="speedUp"
                    spinDuration={50}
                    className="absolute mt-4 ml-4"
                    color="#A78BFA"
                />
            </div>
        );
    }

    if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

    const diary = diaryResponse?.content?.[0];

    if (!diary) return <p className="text-center mt-10">Diary tidak ditemukan.</p>;

    const rendered = renderDiaryContent(diary);
    const seoAttributes = getDiaryContentSEOAttributes(diary);

    return (
        <>
            <Helmet>
                <title>{seoAttributes.title || 'Your Diary'}</title>
                <meta name="description" content={seoAttributes.description || ''} />
                <meta name="keywords" content={seoAttributes.keywords || ''} />
                <meta name="author" content={seoAttributes.author || 'Redaksi'} />
                <meta property="og:title" content={seoAttributes.title || 'Your Diary'} />
                <meta property="og:description" content={seoAttributes.description || ''} />
                {seoAttributes.image && (
                    <meta property="og:image" content={seoAttributes.image} />
                )}
                <meta property="article:published_time" content={seoAttributes.publishedTime || ''} />
            </Helmet>

            <div className="max-w-2xl mx-auto px-4 py-8">
                <Navbarr />

                <h1 className="text-2xl font-bold mb-4">
                    {diary.meta?.title || 'No Title'}
                </h1>

                {diary.meta?.image && (
                    <RenderImage src={diary.meta.image} alt={diary.meta.title || 'Diary Image'} />
                )}

                <p className="text-gray-500 mb-2">
                    <strong>Status:</strong> {diary.status}
                </p>
                <p className="text-gray-500 mb-6">
                    <strong>Created at:</strong>{' '}
                    {new Date(diary.created_dt).toLocaleString()}
                </p>

                <div>
                    {rendered.contentBlocks.map((block, idx) => {
                        if (block.type === 'paragraph') {
                            const match = block.text.match(/<(YoutubeEmbed|InstagramEmbed|TiktokEmbed|TwitterEmbed)\s+url="([^"]+)"\s*\/?>/);
                            if (match) {
                                const [, type, url] = match;
                                switch (type) {
                                    case 'YoutubeEmbed': return <YoutubeEmbed key={idx} url={url} />;
                                    case 'InstagramEmbed': return <InstagramEmbed key={idx} url={url} />;
                                    case 'TiktokEmbed': return <TiktokEmbed key={idx} url={url} />;
                                    case 'TwitterEmbed': return <TwitterEmbed key={idx} tweetId={url} />;
                                    default: return <p key={idx} className="text-red-500">Unsupported embed</p>;
                                }
                            }
                            return (
                                <p
                                    key={idx}
                                    className="mb-4 leading-relaxed text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: sanitizeTextContent(block.text) }}
                                />
                            );
                        }

                        if (block.type === 'heading' && block.level === 3) {
                            return <h3 key={idx} className="text-xl font-semibold mb-3 text-gray-900">{sanitizeTextContent(block.text)}</h3>;
                        }

                        if (block.type === 'list') {
                            return (
                                <ul key={idx} className="list-disc list-inside mb-4 space-y-1 text-gray-700">
                                    {block.items.map((item, i) => (
                                        <li key={i}>{sanitizeTextContent(item)}</li>
                                    ))}
                                </ul>
                            );
                        }

                        if (block.type === 'image') return <RenderImage key={idx} src={block.url} alt="Embedded" />;
                        if (block.type === 'youtube') return <YoutubeEmbed key={idx} url={block.url} />;
                        if (block.type === 'instagram') return <InstagramEmbed key={idx} url={block.url} />;
                        if (block.type === 'twitter') return <TwitterEmbed key={idx} tweetId={block.tweetId} />;
                        if (block.type === 'tiktok') return <TiktokEmbed key={idx} url={block.url} />;

                        return null;
                    })}
                </div>
            </div>
        </>
    );
}
