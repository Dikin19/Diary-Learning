import { useEffect } from 'react';

export default function TwitterEmbed({ tweetId }) {
    // console.log('twetter :', tweetId)

    useEffect(() => {

        const scriptId = 'twitter-embed-script';

        if (!document.getElementById(scriptId)) {

            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            document.body.appendChild(script);
            // sama dengan <script src="https://platform.twitter.com/widgets.js" async></script>
        } else {
            window.twttr?.widgets?.load();
            /*
            window.twttr adalah object dari script Twitter.
            twttr.widgets.load() akan mencari semua elemen <blockquote class="twitter-tweet"> dan merendernya jadi Tweet yang bisa tampil penuh.
            🧠 Jadi, kalau script udah ada, kita tinggal suruh dia render ulang (misal
            */
        }
    }, [tweetId]);

    if (!tweetId) return null;

    return (
        <blockquote className="twitter-tweet" style={{ margin: '20px 0' }}>
            <a href={`https://twitter.com/i/status/${tweetId}`} />
        </blockquote>
    );
}
