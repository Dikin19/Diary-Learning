const CDN_WISATA_URL = 'https://cdn.wisata.app'
const CDN_TWITTER_URL = 'https://pbs.twimg.com'
const CDN_WISATA_IMG_SIZE = {
  TH: 'th',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
}

/**
 * TASK: Find available image size for Twitter CDN
 */
// const CDN_TWITTER_IMG_SIZE = {
//   ...
// }

/**
 * TASK: Replace original image URL with size-optimized image URL.
 * @example
 * For Wisata CDN URL:
 * ```
 * https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg
 * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_th.jpg
 * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_lg.jpg
 * ```
 *
 * Note that some images may not have optimized URL variants.
 */
// export function getSizeOptimizedImageUrl(originalUrl, desiredSize) {
//   ...
// }

/**
 * TASK: Extracts SEO attributes from diary content
 */
// export function getDiaryContentSEOAttributes(contentData) {
//   ...
// }

/**
 * TASK: Convert diary content to renderable data
 * 
 * The content coming from `/cms/diary` is in MDX (Markdown with Embedded Components) format. This function help render that content.
 * 
 * Known MDX components are:
 * - \<YoutubeEmbed />
 * - \<InstagramEmbed />
 * - \<TiktokEmbed />
 * - \<TwitterEmbed />
 */
  export function renderDiaryContent(contentData) {
    if (!contentData || typeof contentData.content !== 'string') {
      return {
        contentBlocks: [],
        metadata: {},
        rawContent: "",
      };
    }

    let text = contentData.content
      .replace(/(\n\s*-\s.+?)\n\s*\n(?=\s*-\s)/g, "$1\n")
      .replace(/\n\s+-/g, "\n-");

    const words = text.trim().split(/\s+/);
    const metadata = {
      wordCount: words.length,
      readingTime: Math.ceil(words.length / 200),
      publishedAt: contentData.published_at,
      updatedAt: contentData.updated_at,
      tags: contentData.tags || [],
      author: contentData.author || {},
    };

    const lines = text.split('\n');
    const contentBlocks = [];
    let currentList = [];

    const regex = {
      twitter: /https?:\/\/twitter\.com\/(?:#!\/)?\w+\/status\/(\d+)/i,
      instagram: /https?:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+/i,
      youtube: /https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/i,
      tiktok: /https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/(\d+)/i,
      image: /^!\[\]\((https?:\/\/[^\s)]+)\)/,
      heading: /^(#{2,4})\s+(.*)/,
      bold: /\*\*(.*?)\*\*/g,
      italic: /\*(.*?)\*/g,
      blockquote: /^>\s?(.*)/,
    };

    function flushList() {
      if (currentList.length > 0) {
        contentBlocks.push({ type: 'list', items: currentList });
        currentList = [];
      }
    }

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        continue;
      }

      if (regex.image.test(trimmed)) {
        flushList();
        contentBlocks.push({ type: 'image', url: trimmed.match(regex.image)[1] });
        continue;
      }

      if (regex.twitter.test(trimmed)) {
        flushList();
        contentBlocks.push({ type: 'twitter', tweetId: trimmed.match(regex.twitter)[1] });
        continue;
      }

      if (regex.instagram.test(trimmed)) {
        flushList();
        contentBlocks.push({ type: 'instagram', url: trimmed });
        continue;
      }

      if (regex.youtube.test(trimmed)) {
        flushList();
        contentBlocks.push({ type: 'youtube', url: trimmed });
        continue;
      }

      if (regex.tiktok.test(trimmed)) {
        flushList();
        contentBlocks.push({ type: 'tiktok', url: trimmed });
        continue;
      }

      const headingMatch = trimmed.match(regex.heading);
      if (headingMatch) {
        flushList();
        const level = headingMatch[1].length;
        contentBlocks.push({ type: 'heading', level, text: headingMatch[2] });
        continue;
      }

      if (regex.blockquote.test(trimmed)) {
        flushList();
        const quoteText = trimmed.match(regex.blockquote)[1];
        contentBlocks.push({ type: 'blockquote', text: quoteText });
        continue;
      }

      if (trimmed.startsWith('- ')) {
        currentList.push(trimmed.slice(2));
      } else {
        flushList();
        let html = trimmed
          .replace(regex.bold, '<strong>$1</strong>')
          .replace(regex.italic, '<em>$1</em>');
        contentBlocks.push({ type: 'paragraph', text: html });
      }
    }

    flushList();

    return {
      contentBlocks,
      metadata,
      rawContent: contentData.content,
    };
  }