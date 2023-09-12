import { useMount, usePrevious, useRequest } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import { useReadingStatusContext } from '../providers/ReadingStatusProvider';
import {
  Article,
  saveFeeds,
  saveSource,
  useArticle,
  useArticles,
  useSources,
} from './storage';

interface Content {
  title: string;
  home_page_url: string;
  items: {
    authors?: { name: string }[];
    date_published: string;
    id: string;
    summary: string;
    title: string;
    url: string;
  }[];
}

const getInfosFromContent = (content: string, link: string) => {
  const url = new URL(link);
  const node = document.createElement('div');
  node.innerHTML = content;

  const images = node.querySelectorAll('img');

  let thumbnail = '';

  url?.origin &&
    images.forEach((img) => {
      img.src = img.src.replace(window.location.origin, url.origin);
      if (!thumbnail && img.src !== '') {
        thumbnail = img.src;
      }
      img.srcset =
        img.srcset === ''
          ? ''
          : img.srcset
              .replaceAll('\n', '')
              .split(',')
              .map((item) => {
                const src = item.startsWith('http') ? item : url.origin + item;
                if (!thumbnail && src !== '') {
                  thumbnail = img.src;
                }
                return src;
              })
              .join(',');
    });

  const a = node.querySelectorAll('a');
  url?.origin &&
    a.forEach((item) => {
      item.href = item.href.replace(window.location.origin, url.origin);
    });

  return { content: node.innerHTML, thumbnail };
};

const queryArticles = async (url: string): Promise<Article[]> => {
  if (url === '') {
    return [];
  }

  const response = await fetch(
    'https://api.apyhub.com/convert/rss-url/json?detailed=true',
    {
      method: 'POST',
      headers: {
        'apy-token':
          'APY0qDhAX67sJBpxw9vOEsA45D3nVSlnqRjfIrVzxbjwcuxHpODjGYYiv5Vhg3zYE9E',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = (await response.json()) as Content;
  const articles = data.items.map((item) => {
    const { content, thumbnail } = getInfosFromContent(item.summary, item.url);
    return {
      author: item.authors?.[0]?.name ?? '',
      content,
      guid: item.id,
      link: item.url,
      pubDate: new Date(item.date_published).toISOString(),
      thumbnail: thumbnail,
      title: item.title,
      source: url,
      read: 0 as const,
    };
  });
  await saveSource({ title: data.title, source: url });
  await saveFeeds(articles);

  return articles;
};

export const useRequestArticles = () => {
  const { source, onlyUnread, feedView, sourceView } =
    useReadingStatusContext();
  const preSourceView = usePrevious(sourceView);

  const { loading, refresh } = useRequest(() => queryArticles(source), {
    cacheKey: source,
    staleTime: 3000,
    debounceWait: 1000,
    debounceLeading: true,
    refreshDeps: [source],
  });
  const data = useArticles({ source, read: onlyUnread ? 0 : undefined });

  useEffect(() => {
    // from source view to feed view
    preSourceView && feedView && refresh();
  }, [preSourceView, feedView]);

  const articles = data ?? [];

  return {
    data: articles,
    loading,
    refresh,
  };
};

export const useCurrentArticle = () => {
  const { guid } = useReadingStatusContext();
  return useArticle(guid);
};

export const useCurrentSources = () => {
  const { source } = useReadingStatusContext();
  const sources = useSources();

  const data = sources ?? [];

  return {
    sources: data,
    current: data.find((item) => item.source === source),
  };
};

export const useTouchHandler = () => {
  const maxDistance = 50;
  const { back } = useReadingStatusContext();

  const lastX = useRef<number>();
  const lastY = useRef<number>();
  const [percent, setPercent] = useState(0);
  const percentRef = useRef(percent);

  useMount(() => {
    document.body.addEventListener('touchstart', (e) => {
      lastX.current = e.targetTouches[0].pageX;
      lastY.current = e.targetTouches[0].pageY;
      setPercent(0);
      percentRef.current = 0;
    });
    document.body.addEventListener('touchmove', (e) => {
      const pageX = e.targetTouches[0].pageX;
      const pageY = e.targetTouches[0].pageY;

      const distanceX = pageX - (lastX.current ?? pageX);
      const distanceY = Math.abs(pageY - (lastY.current ?? pageY));
      lastX.current = pageX;
      lastY.current = pageY;

      if (
        Math.abs(distanceX) >= distanceY * 3 &&
        (document.getSelection() == null ||
          document.getSelection()!.toString() === '')
      ) {
        setPercent((pre) => {
          const current = pre + Math.floor((distanceX * 100) / maxDistance);
          const result = current >= 100 ? 100 : current <= 0 ? 0 : current;
          percentRef.current = result;
          return result;
        });
      }
    });
    document.body.addEventListener('touchend', (e) => {
      if (percentRef.current >= 90) {
        back();
      }
      lastX.current = undefined;
      lastY.current = undefined;
      percentRef.current = 0;
      setPercent(0);
    });
  });
  return { percent };
};
