import { useKeyPress } from 'ahooks';
import React from 'react';
import { TbArrowBigLeftLinesFilled, TbArrowLeft } from 'react-icons/tb';
import IconButton from './components/button/IconButton';
import Article from './pages/article';
import Feed from './pages/feed';
import Source from './pages/source';
import { useDarkModeContext } from './providers/GlobalSettingsProvider';
import { useReadingStatusContext } from './providers/ReadingStatusProvider';
import { useTouchHandler } from './utils/hooks';

const BackButton = () => {
  const { feedView, articleView, back } = useReadingStatusContext();

  const backCss = articleView
    ? 'fixed left-1 top-2 xl:hidden'
    : feedView
    ? 'fixed left-1 top-2 md:hidden'
    : 'hidden';

  useKeyPress('b', back);

  return (
    <IconButton onClick={back} className={backCss}>
      <TbArrowLeft />
    </IconButton>
  );
};

const BackTouchIndicate = React.memo(() => {
  const { percent } = useTouchHandler();

  const opacity =
    percent < 10
      ? 'opacity-0'
      : percent < 20
      ? 'opacity-10'
      : percent < 30
      ? 'opacity-20'
      : percent < 40
      ? 'opacity-30'
      : percent < 50
      ? 'opacity-40'
      : percent < 60
      ? 'opacity-50'
      : percent < 70
      ? 'opacity-60'
      : percent < 80
      ? 'opacity-70'
      : percent < 90
      ? 'opacity-80'
      : percent < 100
      ? 'opacity-90'
      : 'opacity-100';

  return (
    <TbArrowBigLeftLinesFilled
      className={`fixed text-8xl pointer-events-none ${opacity} left-[calc(50vw-3rem)] top-[calc(50vh-6rem)] duration-100 transition-all border-2 rounded-2xl p-2`}
    />
  );
});

function App() {
  const { darkMode } = useDarkModeContext();
  const { feedView, articleView } = useReadingStatusContext();

  //  1column  <->  md  <->  2columns  <->  xl  <-> 3columns
  const sourceCss = articleView
    ? 'h-full w-0 opacity-0 xl:opacity-100 xl:w-[24rem] transition-all duration-200 ease-out'
    : feedView
    ? 'h-full w-0 opacity-0 md:opacity-100 md:w-[24rem] transition-all duration-200 ease-out'
    : 'w-full h-full';
  const feedCss = articleView
    ? 'h-full w-0 opacity-0 md:opacity-100 md:w-[24rem] transition-all duration-200 ease-out'
    : feedView
    ? 'w-full h-full '
    : 'hidden';
  const articleCss = articleView ? 'w-full h-full' : 'hidden';

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex w-full h-screen overflow-hidden dark:bg-slate-950 text-slate-950 dark:text-white">
        <div className={sourceCss}>
          <Source />
        </div>
        <div className={feedCss}>
          <Feed />
        </div>
        <div className={articleCss}>
          <Article />
        </div>

        <BackButton />
        <BackTouchIndicate />
      </div>
    </div>
  );
}

export default App;
