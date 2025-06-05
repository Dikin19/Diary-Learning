import { parseToBlocks } from "../app/Components/CmsUtils/Parse";


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
  console.log(url,size);
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



  // const diaryData = {
  //   meta: {
  //     title: "Illumi Singapore 2024: Transformasi Marina Bay",
  //     description: "Festival cahaya spektakuler dengan 20 juta lampu LED dan 9 dunia bertema.",
  //     image: "https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg",
  //     slug: "illumi-singapore-2024-marina-bay-20-juta-lampu-led",
  //   },
  //   created_dt: "2024-09-01T00:00:00+00:00",
  //   content: "...",
  // };


  // const seo = getDiaryContentSEOAttributes(diaryData);
  // console.log(seo);

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



export function renderDiaryContent(diary) {
  const rawContent = diary?.content || "";

  const optimizedContent = rawContent.replace(
    /!\[(.*?)\]\((https:\/\/cdn\.wisata\.app\/[^\s)]+)\)/g,
    (match, alt, url) => {
      const optimizedUrl = getSizeOptimizedImageUrl(url, "md");
      return `![${alt}](${optimizedUrl})`;
    }
  );

  
  const contentBlocks = parseToBlocks(optimizedContent);

  return {
    contentBlocks,
  };
}