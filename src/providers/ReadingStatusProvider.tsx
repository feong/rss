import { useLocalStorageState } from 'ahooks';
import React, { PropsWithChildren, useContext } from 'react';
import { readArticle } from '../utils/storage';

const useStatus = () => {
  const [source, setSource] = useLocalStorageState<string>('source');
  const [guid, setGuid] = useLocalStorageState<string>('guid');
  // 0: source column  1: feed column 2: article column
  const [viewColumnIndex, setViewColumnIndex] = useLocalStorageState<number>(
    'viewColumnIndex',
    { defaultValue: 0 },
  );
  const [onlyUnread, setOnlyUnread] = useLocalStorageState<boolean>(
    'onlyUnread',
    {
      defaultValue: false,
    },
  );

  return {
    source: source ?? '',
    setSource: (source: string) => {
      setSource(source);
      setViewColumnIndex(1);
    },
    guid: guid ?? '',
    setGuid: (guid: string) => {
      setGuid(guid);
      setViewColumnIndex(2);
      readArticle(guid);
    },
    back: () => {
      setViewColumnIndex((pre) => (pre ?? 1) - 1);
      if (guid) {
        setGuid(undefined);
      } else if (source) {
        setSource(undefined);
      }
    },
    sourceView: viewColumnIndex === 0,
    feedView: viewColumnIndex === 1,
    articleView: viewColumnIndex === 2,
    onlyUnread,
    setOnlyUnread,
  };
};

type ContextType = ReturnType<typeof useStatus>;

const ReadingStatusContext = React.createContext<ContextType>(null as any);

export function useReadingStatusContext() {
  return useContext(ReadingStatusContext);
}

const ReadingStatusProvider: (props: PropsWithChildren) => JSX.Element = (
  props,
) => {
  const data = useStatus();
  return (
    <ReadingStatusContext.Provider value={data}>
      {props.children}
    </ReadingStatusContext.Provider>
  );
};

export default ReadingStatusProvider;
