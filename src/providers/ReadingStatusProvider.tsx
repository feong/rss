import { useLocalStorageState } from 'ahooks';
import React, { PropsWithChildren, useContext } from 'react';
import { readArticle } from '../utils/storage';

const useStatus = () => {
  const [source, setSource] = useLocalStorageState<string>('source');
  const [guid, setGuid] = useLocalStorageState<string>('guid');
  const [onlyUnread, setOnlyUnread] = useLocalStorageState<boolean>(
    'onlyUnread',
    {
      defaultValue: false,
    },
  );

  // 0: source column  1: feed column 2: article column
  const viewColumnIndex = guid != null ? 2 : source != null ? 1 : 0;

  return {
    source: source ?? '',
    setSource: (source: string) => {
      setSource(source);
    },
    guid: guid ?? '',
    setGuid: (guid: string) => {
      setGuid(guid);
      readArticle(guid);
    },
    back: () => {
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
