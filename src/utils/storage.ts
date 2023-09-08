import Dexie, { Table } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { groupBy } from 'lodash';

export interface Article {
  author: string;
  content: string;
  guid: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  title: string;
  source: string;
  read: 0 | 1;
}

export interface Source {
  title: string;
  source: string;
}

class Store extends Dexie {
  articles!: Table<Article>;
  sources!: Table<Source>;

  constructor() {
    super('database');
    this.version(1).stores({
      articles: 'guid, author, title, source, read, [source+read]',
      sources: 'source',
    });
  }
}

export const db = new Store();
// db.delete();

export const saveFeeds = async (articles: Article[]) => {
  const feeds = await db.articles.bulkGet(articles.map((item) => item.guid));
  const data = articles.map((item) => {
    const existed = feeds.find((feed) => feed?.guid === item.guid);
    return { ...item, read: existed?.read ?? 0 };
  });

  return db.articles.bulkPut(data);
};

export const useArticles = (params: {
  source: string;
  read?: number;
  offset?: number;
  limit?: number;
}) => {
  const { source, read, offset = 0, limit = 20 } = params;
  return useLiveQuery(() => {
    if (read == null) {
      return db.articles
        .where({ source })
        .offset(offset)
        .limit(limit)
        .reverse()
        .sortBy('pubDate');
    } else {
      return db.articles
        .where('[source+read]')
        .equals([source, read])
        .offset(offset)
        .limit(limit)
        .reverse()
        .sortBy('pubDate');
    }
  }, [source, read, offset, limit]);
};

export const useArticle = (guid: string) => {
  return useLiveQuery(() => {
    return db.articles.get(guid);
  }, [guid]);
};

export const useUnreadArticles = () => {
  const data = useLiveQuery(() => {
    return db.articles.where({ read: 0 }).toArray();
  }, []);
  return groupBy(data, 'source');
};

export const readArticle = async (guid: string) => {
  db.articles.update(guid, { read: 1 });
};

export const readAllArticles = async (source: string) => {
  db.articles.where('[source+read]').equals([source, 0]).modify({ read: 1 });
};

export const saveSource = (source: Source) => {
  return db.sources.put(source);
};

export const delSource = (source: string) => {
  return db.sources.delete(source);
};

export const useSources = () => {
  return useLiveQuery(() => {
    return db.sources.toArray();
  });
};
