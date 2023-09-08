import { useLocalStorageState } from 'ahooks';
import React, { PropsWithChildren, useContext } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useLocalStorageState<boolean>('darkMode');
  return {
    darkMode: darkMode ?? false,
    setDarkMode,
  };
};

type ContextType = ReturnType<typeof useDarkMode>;

const DarkModeContext = React.createContext<ContextType>(null as any);

export function useDarkModeContext() {
  return useContext(DarkModeContext);
}

const GlobalSettingsProvider: (props: PropsWithChildren) => JSX.Element = (
  props,
) => {
  const data = useDarkMode();
  return (
    <DarkModeContext.Provider value={data}>
      {props.children}
    </DarkModeContext.Provider>
  );
};

export default GlobalSettingsProvider;
