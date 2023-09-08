import { useHistoryTravel, useLocalStorageState, useMount } from 'ahooks';
import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { readArticle } from '../utils/storage';

const rootUrl = '/';
const feedUrl = '/feed';
const articleUrl = '/feed/article'

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
  const [pathname, setPathname] = useState(window.location.pathname)

  useMount(()=> {
    window.onpopstate = (e) => { 
       setPathname(window.location.pathname)
    }
  })

  return {
    source: source ?? '',
    setSource: (source: string) => {
      setSource(source);
      window.history.pushState({}, source, feedUrl)
      setPathname(feedUrl)
    },
    guid,
    setGuid: (guid: string) => {
      setGuid(guid);
      readArticle(guid);
      window.history.pushState({}, guid, articleUrl)
      setPathname(articleUrl)
    },
    back: () => {
      window.history.back();
    },
    sourceView: pathname === rootUrl,
    feedView: pathname === feedUrl,
    articleView: pathname === articleUrl,
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
