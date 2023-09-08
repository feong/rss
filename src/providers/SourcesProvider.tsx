import { useLocalStorageState } from 'ahooks';
import React, { PropsWithChildren, useContext } from 'react';

const useSource = () => {
  const [sources = [], setSources] = useLocalStorageState<string[]>('sources');
  return {
    sources,
    addSource: (source: string) =>
      !sources.includes(source) && setSources(sources.concat(source)),
    removeSource: (source: string) =>
      setSources(sources.filter((item) => item !== source)),
  };
};

type ContextType = ReturnType<typeof useSource>;

const SourceContext = React.createContext<ContextType>(null as any);

export function useSourceContext() {
  return useContext(SourceContext);
}

const SourcesProvider: (props: PropsWithChildren) => JSX.Element = (props) => {
  const data = useSource();
  return (
    <SourceContext.Provider value={data}>
      {props.children}
    </SourceContext.Provider>
  );
};

export default SourcesProvider;
