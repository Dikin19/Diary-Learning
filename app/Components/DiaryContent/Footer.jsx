export const Footer = ({ diary }) => {
    const updatedDate = diary.updated_dt || diary.created_dt;
    return (
        <footer className="mt-16 border-t pt-6 text-gray-600 text-sm italic flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
                <small>
                    Terakhir diperbarui:{" "}
                    <time dateTime={updatedDate}>
                        {new Date(updatedDate).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                </small>
            </div>

            <div>
                <small>
                    Ditulis oleh:{" "}
                    <span className="font-medium">{diary.meta?.author || "Redaksi Wisata Diary"}</span>
                </small>
            </div>

            <div className="flex space-x-6">
                {["Twitter", "Instagram", "Facebook"].map((platform) => (
                    <a
                        key={platform}
                        href={`https://${platform.toLowerCase()}.com/yourprofile`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-600 transition-colors"
                        aria-label={platform}
                    >
                        {platform}
                    </a>
                ))}
            </div>

            <div className="text-gray-400">
                <small>&copy; {new Date().getFullYear()} Wisata Diary. All rights reserved.</small>
            </div>
        </footer>
    );
};
