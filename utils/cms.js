const CDN_WISATA_URL = 'https://cdn.wisata.app';
const CDN_TWITTER_URL = 'https://pbs.twimg.com';

const CDN_WISATA_IMG_SIZE = {
  TH: 'th',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
};

/**
 * Available image sizes for Twitter CDN
 */
const CDN_TWITTER_IMG_SIZE = {
  THUMB: 'thumb',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

function App() {
  console.log('Twitter Large Image Size:', CDN_TWITTER_IMG_SIZE.LARGE);
  return 'Hello';
}

// Call the App function and print its return value
const result = App();
console.log('App Return:', result);


/**
 * TASK: Replace original image URL with size-optimized image URL.
 * @example
 * For Wisata CDN URL:
 * ```
 * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg
 * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_th.jpg
 * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_lg.jpg
 * ```
 *
 * Note that some images may not have optimized URL variants.
 */
// utils/cms.js
export function getSizeOptimizedImageUrl(baseUrl, size) {
  if (!baseUrl) return null;

  // Jangan ubah URL dari platform luar
  const isExternal = [
    'pbs.twimg.com',
    'instagram.com',
    'tiktokcdn.com',
    'youtube.com',
    'youtu.be',
    'cdn',
    'unsplash',
    'googleusercontent.com',
  ].some(domain => baseUrl.includes(domain));

  if (isExternal) return baseUrl;

  // Lengkapi domain kalau belum lengkap
  if (!baseUrl.startsWith('http')) {
    baseUrl = `https://project-tempest-hiring.up.railway.app${baseUrl}`;
  }

  // Ubah menjadi _600x.jpg
  const dotIndex = baseUrl.lastIndexOf('.');
  if (dotIndex === -1) return baseUrl;

  const name = baseUrl.substring(0, dotIndex);
  const ext = baseUrl.substring(dotIndex);
  return `${name}_${size}${ext}`;
}




// const originalUrl = 'https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg';

// const smallUrl = getSizeOptimizedImageUrl(originalUrl, 'sm');
// const largeUrl = getSizeOptimizedImageUrl(originalUrl, 'lg');
// const originalPreserved = getSizeOptimizedImageUrl(originalUrl, 'original');

// console.log('Small size:', smallUrl);
// console.log('Large size:', largeUrl);
// console.log('Original (unchanged):', originalPreserved);

/**
 * TASK: Extracts SEO attributes from diary content
*/

// utils/seo.js atau file terpisah
export function getDiaryContentSEOAttributes(contentData) {
  if (!contentData) return {};

  const {
    meta = {},
    created_dt = new Date().toISOString(),
  } = contentData;

  return {
    title: meta.title || 'Untitled Diary',
    description: meta.description || 'Baca artikel menarik di sini.',
    image: meta.image || '',
    author: 'Redaksi',  // default author
    keywords: meta.slug || '',  // pakai slug sebagai keywords
    publishedTime: created_dt,
  };
}



// const exampleDiary = {
//   title: 'Sunset in Bali',
//   excerpt: 'A beautiful journey to watch the sunset on Kuta Beach.',
//   coverImage: 'https://cdn.wisata.app/diary/abc123_lg.jpg',
//   author: { name: 'Jane Doe' },
//   tags: [{ name: 'travel' }, { name: 'sunset' }],
//   createdAt: '2025-05-30T18:00:00Z',
// };

// const seo = getDiaryContentSEOAttributes(exampleDiary);

// console.log(seo);


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

  // flushList();

  return {
    contentBlocks,
    metadata,
    rawContent: contentData.content,
  };
}



