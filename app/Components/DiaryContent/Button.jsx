import { Link } from "react-router";

export const Button = ({ diary }) => {

    const formattedDate = diary?.created_dt
        ? new Date(diary.created_dt).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'Tanggal tidak tersedia';

    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(diary.meta.title)}%20app%20logo?width=500&height=500&nologo=true`;

    return (

        <div className="mt-20 mb-5 px-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                        src={pollinationsUrl}
                        alt="Wisata App Logo"
                        className="w-8 h-8 object-cover"
                    />
                </div>
                <div className="text-sm text-gray-700">
                    <span className="font-semibold">Wisata Diary</span> · {formattedDate}
                </div>
            </div>

            <Link
                to="/"
                className="inline-block px-5 py-2 rounded-md shadow-md text-white transition duration-200"
                style={{ backgroundColor: "#A78BFA" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7C3AED")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#A78BFA")}
            >
                ← Back to Home
            </Link>

        </div>

    )
}

