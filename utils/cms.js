

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
  const CDN_TWITTER_IMG_SIZE = {
    THUMB: 'thumb',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
  };

  // const App = () => {
  //   console.log('Twitter Large Image Size:', CDN_TWITTER_IMG_SIZE.LARGE);
  //   return 'Hello';
  // }

  // const result = App();
  // console.log('App Return:', result);

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
  // utils/imageUtils.js

export function getSizeOptimizedImageUrl(url, size) {
  const CDN_WISATA_URL = 'https://cdn.wisata.app';
  const CDN_WISATA_IMG_SIZE = {
    TH: 'th',
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
  };

  if (
    typeof url !== 'string' ||
    !url.startsWith(CDN_WISATA_URL) ||
    !url.match(/\.(jpe?g|png|webp)$/i)
  ) {
    return url;
  }

  let sizeSuffix = CDN_WISATA_IMG_SIZE[size.toUpperCase()];
  if (!sizeSuffix) {
    const pxMatch = size.match(/^(\d+)x?$/);
    if (pxMatch) {
      sizeSuffix = pxMatch[1] + 'w';
    }
  }

  if (!sizeSuffix) return url;

  return url.replace(/(\.[a-z]+)$/i, `_${sizeSuffix}$1`);
}



  // const originalUrl = 'https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg';
  // const optimizedUrl = getSizeOptimizedImageUrl(originalUrl, 'lg');
  // console.log(optimizedUrl);

  // const url = 'https://cdn.wisata.app/diary/abc123.jpg';
  // const thumbUrl = getSizeOptimizedImageUrl(url, 'th');

  // console.log(thumbUrl);


/**
 * TASK: Extracts SEO attributes from diary content
 */
export function getDiaryContentSEOAttributes(contentData) {
  if (!contentData || typeof contentData !== 'object') {
    return {
      title: 'Untitled Diary',
      description: 'Baca artikel menarik di sini.',
      image: '',
      author: 'Redaksi',
      keywords: '',
      publishedTime: new Date().toISOString(),
    };
  }

  const meta = contentData.meta || {};
  const title = typeof meta.title === 'string' && meta.title.trim() ? meta.title : 'Untitled Diary';
  const description = typeof meta.description === 'string' && meta.description.trim()
    ? meta.description
    : 'Baca artikel menarik di sini.';
  const image = typeof meta.image === 'string' ? meta.image : '';
  const keywords = typeof meta.slug === 'string' ? meta.slug : '';

  return {
    title,
    description,
    image,
    author: 'Redaksi',
    keywords,
    publishedTime: contentData.created_dt || new Date().toISOString(),
  };
}



  const diaryData = {
    meta: {
      title: "Illumi Singapore 2024: Transformasi Marina Bay",
      description: "Festival cahaya spektakuler dengan 20 juta lampu LED dan 9 dunia bertema.",
      image: "https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg",
      slug: "illumi-singapore-2024-marina-bay-20-juta-lampu-led",
    },
    created_dt: "2024-09-01T00:00:00+00:00",
    content: "...",
  };


  const seo = getDiaryContentSEOAttributes(diaryData);
  console.log(seo);

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
                                console.log(contentData, 'lihat')
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

// Hapus markdown gambar tapi simpan URL
text = text.replace(/!\[[^\]]*\]\(\s*(https?:\/\/[^\s)]+)\s*\)/g, (_, url) => url.trim());

// (Opsional) bersihkan markdown yang rusak
// text = text.replace(/!\[[^\]]*\]\(\s*\)/g, '');
console.log(text, 'text');


  // // Normalisasi line breaks dan list
  // let text = contentData.content
  //   .replace(/(\n\s*-\s.+?)\n\s*\n(?=\s*-\s)/g, "$1\n")
  //   .replace(/\n\s+-/g, "\n-");

  // // HAPUS syntax markdown gambar yang TIDAK valid, seperti ![Untitled](
  // // agar tanda-tanda ini tidak muncul tapi gambar valid tetap muncul
  // text = text.replace(/!\[[^\]]*\]\(/g, '');
  // text = text.replace(/!\[[^\]]*\]\(\s*[\)]/g, '');

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

    imageMarkdown: /^!\[\]\((https?:\/\/[^\s)]+)\)/,
    imageUrlOnly: /^https?:\/\/[^\s)]+(\.(jpe?g|png|webp|gif))?(\?format=(jpe?g|png|webp|gif))?$/i,

    heading: /^(#{2,4})\s+(.*)/,
    bold: /\*\*(.*?)\*\*/g,
    italic: /\*(.*?)\*/g,
    blockquote: /^>\s?(.*)/,
    listItem: /^-\s+(.*)/,
  };

  // Fungsi untuk bersihkan URL gambar dari tanda baca/kurung/karakter tambahan di akhir
  function cleanImageUrl(url) {
   return url.replace(/[\)\]\}\.,!]+$/g, ''); // hapus tanda kurung, titik, koma, seru di akhir URL
  }

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

    // Image dengan markdown ![](url)
    if (regex.imageMarkdown.test(trimmed)) {
      flushList();
      let url = trimmed.match(regex.imageMarkdown)[1];
      url = cleanImageUrl(url);
      contentBlocks.push({ type: 'image', url });
      continue;
    }

    // URL gambar berdiri sendiri
    if (regex.imageUrlOnly.test(trimmed)) {
  flushList();
  let url = trimmed;
  url = cleanImageUrl(url);
  contentBlocks.push({ type: 'image', url });
  continue;
}


    // Twitter status
    if (regex.twitter.test(trimmed)) {
      flushList();
      const tweetId = trimmed.match(regex.twitter)[1];
      contentBlocks.push({ type: 'twitter', tweetId });
      continue;
    }

    // Instagram
    if (regex.instagram.test(trimmed)) {
      flushList();
      contentBlocks.push({ type: 'instagram', url: cleanImageUrl(trimmed) });
      continue;
    }

    // Youtube
    if (regex.youtube.test(trimmed)) {
      flushList();
      contentBlocks.push({ type: 'youtube', url: cleanImageUrl(trimmed) });
      continue;
    }

    // Tiktok
    if (regex.tiktok.test(trimmed)) {
      flushList();
      contentBlocks.push({ type: 'tiktok', url: cleanImageUrl(trimmed) });
      continue;
    }

    // Heading
    const headingMatch = trimmed.match(regex.heading);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      contentBlocks.push({
        type: 'heading',
        level,
        text: headingMatch[2],
      });
      continue;
    }

    // Blockquote
    const blockquoteMatch = trimmed.match(regex.blockquote);
    if (blockquoteMatch) {
      flushList();
      contentBlocks.push({
        type: 'blockquote',
        text: blockquoteMatch[1],
      });
      continue;
    }

    // List item
    const listItemMatch = trimmed.match(regex.listItem);
    if (listItemMatch) {
      currentList.push(listItemMatch[1]);
      continue;
    }

    // Cek URL gambar di dalam paragraf
    const imageUrlsInLine = [...trimmed.matchAll(/https?:\/\/[^\s)]+?\.(?:jpe?g|png|webp|gif)/gi)];

    if (imageUrlsInLine.length > 0) {
      flushList();

      let lastIndex = 0;
      for (const match of imageUrlsInLine) {
        let urlRaw = match[0];
        let url = cleanImageUrl(urlRaw);
        const index = match.index;

        // Paragraf sebelum gambar
        const beforeText = trimmed.slice(lastIndex, index).trim().replace(/[\)\]\}\.,!]+$/g, '');
        if (beforeText) {
          contentBlocks.push({
            type: 'paragraph',
            text: beforeText
              .replace(regex.bold, '<strong>$1</strong>')
              .replace(regex.italic, '<em>$1</em>'),
          });
        }

        // Blok gambar
        contentBlocks.push({ type: 'image', url });

        lastIndex = index + urlRaw.length;
      }

      // Paragraf setelah gambar terakhir, bersihkan tanda baca yang mengganggu
      let afterText = trimmed.slice(lastIndex).trim();
      afterText = afterText.replace(/^[\)\]\}\.,!]+/, ''); // hapus tanda baca awal kalau ada
      if (afterText) {
        contentBlocks.push({
          type: 'paragraph',
          text: afterText
            .replace(regex.bold, '<strong>$1</strong>')
            .replace(regex.italic, '<em>$1</em>'),
        });
      }

      continue;
    }

    // Default paragraf biasa
    const formattedText = trimmed
      .replace(regex.bold, '<strong>$1</strong>')
      .replace(regex.italic, '<em>$1</em>');

    flushList();
    contentBlocks.push({
      type: 'paragraph',
      text: formattedText,
    });
  }

  flushList();

  return {
    contentBlocks,
    metadata,
    rawContent: text,
  };
}




