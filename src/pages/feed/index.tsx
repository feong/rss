import { useKeyPress } from 'ahooks';
import React from 'react';
import { TbEyeCheck, TbPokeball, TbReload } from 'react-icons/tb';
import IconButton from '../../components/button/IconButton';
import Card from '../../components/card';
import FeedList from '../../components/list/feedList';
import { useReadingStatusContext } from '../../providers/ReadingStatusProvider';
import { useCurrentSources, useRequestArticles } from '../../utils/hooks';
import { readAllArticles, useUnreadArticles } from '../../utils/storage';

type Props = {};

const ReadAllButton = (props: { first: string }) => {
  const { source, setGuid } = useReadingStatusContext();

  useKeyPress('f', () => setGuid(props.first));

  return (
    <IconButton
      onClick={() => {
        readAllArticles(source);
      }}
    >
      <TbEyeCheck />
    </IconButton>
  );
};

const ReadAllButtonContainer = React.memo(() => {
  const { source } = useReadingStatusContext();
  const groups = useUnreadArticles();
  const count = groups[source]?.length;
  if (count == null || count === 0) return null;

  return <ReadAllButton first={groups[source][count - 1].guid} />;
});

const Feed = React.memo((props: Props) => {
  const { data, refresh, loading } = useRequestArticles();
  const { feedView, articleView, onlyUnread, setOnlyUnread, setGuid } =
    useReadingStatusContext();
  const { current } = useCurrentSources();

  const headerCss = articleView
    ? 'md:ml-8 xl:ml-0'
    : feedView
    ? 'ml-8 md:ml-0'
    : '';

  return (
    <div className=" h-full p-1 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <ReadAllButtonContainer />
          <IconButton
            className={
              onlyUnread ? 'text-xxl opacity-50 ml-2' : 'text-xxl ml-2'
            }
            onClick={() => setOnlyUnread((pre) => !pre)}
          >
            <TbPokeball />
          </IconButton>
          <IconButton
            className={loading ? 'animate-spin mt-1 ml-2' : 'mt-1 ml-2'}
            onClick={refresh}
          >
            <TbReload />
          </IconButton>
        </div>
      </div>
      <Card className="!p-0 flex-auto hover:!overflow-auto dark:[color-scheme:dark]">
        <FeedList items={data} onClick={setGuid} />
      </Card>
    </div>
  );
});

export default Feed;
