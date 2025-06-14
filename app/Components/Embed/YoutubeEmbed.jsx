export default function YoutubeEmbed({ url }) {
    // console.log(url, 'embedYoutube');
    const cleanUrl = decodeURIComponent(url.replace(/\\\//g, '/')); // clean code
    /*
    Input URL: https:\\/\\/www.youtube.com\\/watch%3Fv%3Dabc123
    cleanUrl: https://www.youtube.com/watch?v=abc123
    */

    const getYoutubeVideoId = (url) => {
        try {
            const parsed = new URL(url);

            // Cek format embed
            if (parsed.hostname.includes('youtube.com') && parsed.pathname.startsWith('/embed/')) {
                // Ambil videoId dari path setelah /embed/
                return parsed.pathname.split('/embed/')[1].split('?')[0];
            }

            if (parsed.hostname.includes('youtu.be')) {
                return parsed.pathname.slice(1);

            } else if (parsed.hostname.includes('youtube.com')) {
                return parsed.searchParams.get('v');
            }
        } catch (err) {
            console.error('Error parsing YouTube URL:', err);
        }
        return null;
    };

    const videoId = getYoutubeVideoId(cleanUrl);

    if (!videoId) {
        return <div style={{ color: 'red' }}>Invalid YouTube URL: {cleanUrl}</div>;
    }

    return (
        <div style={{ margin: '20px 0', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
}
