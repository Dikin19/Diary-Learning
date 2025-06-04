import { useEffect } from 'react';

export default function TwitterEmbed({ tweetId }) {
    useEffect(() => {
        const scriptId = 'twitter-embed-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            document.body.appendChild(script);
        } else {
            window.twttr?.widgets?.load();
        }
    }, [tweetId]);

    if (!tweetId) return null;

    return (
        <blockquote className="twitter-tweet" style={{ margin: '20px 0' }}>
            <a href={`https://twitter.com/i/status/${tweetId}`} />
        </blockquote>
    );
}
