import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiaryById } from "../store/ProductSlice";
import { useParams } from "react-router";
import CircularText from "../Components/Reactbits/CircularText/CircularText";
import { renderDiaryContent } from "../../utils/cms";

export default function DiaryContent() {

    const params = useParams();
    const dispatch = useDispatch();
    const diaries = useSelector((state) => state.product.detail)
    const error = useSelector((state) => state.product.error)
    const isLoading = useSelector((state) => state.product.isLoading)

    useEffect(() => {
        dispatch(getDiaryById(params.id))
    }, [dispatch], params.id);

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


    // console.log(diaries, 'diaryById')
    const arrDiary = diaries.content
    const diary = arrDiary?.[0];
    // console.log(diary, 'ObjOfDiary')

    if (!diary) return <p className="text-center mt-10">Diary tidak ditemukan.</p>

    console.log("diary:", diary);
    console.log("diary content type:", typeof diary?.content);

    const contentResult = renderDiaryContent(diary);

    if (!contentResult) {
        return <p className="text-center mt-10">Gagal merender konten.</p>;
    }

    const { contentBlocks, metadata } = contentResult;

    console.log("blocks:", contentBlocks);
    console.log("meta:", metadata);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="mb-4 text-sm text-gray-500">
                <p><strong>Penulis:</strong> {metadata.author?.name || 'Anonim'}</p>
                <p><strong>Dipublikasikan:</strong> {new Date(metadata.publishedAt).toLocaleDateString()}</p>
                <p><strong>Estimasi Baca:</strong> {metadata.readingTime} menit</p>
                <div className="flex gap-2 mt-2">
                    {metadata.tags.map((tag, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <article className="prose prose-lg max-w-none">
                {contentBlocks.map((block, index) => {
                    switch (block.type) {
                        case 'heading':
                            if (block.level === 2) return <h2 key={index}>{block.text}</h2>;
                            if (block.level === 3) return <h3 key={index}>{block.text}</h3>;
                            if (block.level === 4) return <h4 key={index}>{block.text}</h4>;
                            return null;

                        case 'paragraph':
                            return <p key={index} dangerouslySetInnerHTML={{ __html: block.text }} />;

                        case 'blockquote':
                            return (
                                <blockquote key={index} className="border-l-4 pl-4 italic text-gray-600">
                                    {block.text}
                                </blockquote>
                            );

                        case 'list':
                            return (
                                <ul key={index} className="list-disc list-inside">
                                    {block.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            );

                        case 'image':
                            return <img key={index} src={block.url} alt="Diary visual" className="my-4 rounded-lg" />;

                        case 'youtube':
                            return (
                                <div key={index} className="aspect-w-16 aspect-h-9 my-4">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${block.url.split("v=")[1]}`}
                                        title="YouTube video"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            );

                        case 'instagram':
                            return (
                                <div key={index} className="my-4">
                                    <blockquote className="instagram-media" data-instgrm-permalink={block.url}></blockquote>
                                </div>
                            );

                        case 'twitter':
                            return (
                                <div key={index} className="my-4">
                                    <blockquote className="twitter-tweet">
                                        <a href={`https://twitter.com/i/status/${block.tweetId}`}>Lihat di Twitter</a>
                                    </blockquote>
                                </div>
                            );

                        case 'tiktok':
                            return (
                                <div key={index} className="my-4">
                                    <blockquote className="tiktok-embed" cite={block.url}>
                                        <a href={block.url}>Lihat di TikTok</a>
                                    </blockquote>
                                </div>
                            );

                        default:
                            return null;
                    }
                })}
            </article>
        </div>


    );

}

