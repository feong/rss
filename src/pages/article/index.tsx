import { useKeyPress } from 'ahooks';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import Card from '../../components/card';
import { useCurrentArticle } from '../../utils/hooks';
import { Article } from '../../utils/storage';

type Props = {
  article: Article;
};

const ArticleContent = (props: Props) => {
  const { article } = props;
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { content } = article;

  useEffect(() => {
    if (ref.current && content) {
      ref.current.innerHTML = content;
      cardRef.current?.focus();
    }
  }, [content]);

  return (
    <div className=" h-full p-1 flex flex-col " ref={containerRef}>
      <Card
        className="flex-auto overflow-y-auto dark:[color-scheme:dark] outline-none"
        key={article.guid}
        ref={cardRef}
        tabIndex={0}
      >
        <h1 className=" text-center">{article.title}</h1>
        <p className="truncate text-sm text-slate-500 text-center">
          {dayjs(article.pubDate).format('MMMDD YYYY, HH:mm')}
        </p>
        <div className="article" ref={ref} autoFocus />
      </Card>
    </div>
  );
};

const ArticlePage = () => {
  const article = useCurrentArticle();
  if (article == null) {
    return null;
  }

  return article && <ArticleContent article={article} />;
};

export default ArticlePage;
