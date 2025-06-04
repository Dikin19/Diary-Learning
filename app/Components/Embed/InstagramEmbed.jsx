import { useEffect, useRef } from 'react';

export default function InstagramEmbed({ url }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const scriptId = 'instagram-embed-script';

        // Load embed.js only once
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://www.instagram.com/embed.js';
            script.async = true;
            script.onload = () => window.instgrm?.Embeds.process();
            document.body.appendChild(script);
        } else {
            window.instgrm?.Embeds.process();
        }
    }, [url]);

    return (
        <div ref={containerRef} className="my-4">
            <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    border: 0,
                    borderRadius: '8px',
                    padding: 0,
                    margin: '20px 0',
                }}
            ></blockquote>
        </div>
    );
}
