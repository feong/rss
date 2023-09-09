import { useKeyPress } from 'ahooks';
import { TbArrowLeft } from 'react-icons/tb';
import IconButton from './components/button/IconButton';
import Article from './pages/article';
import Feed from './pages/feed';
import Source from './pages/source';
import { useDarkModeContext } from './providers/GlobalSettingsProvider';
import { useReadingStatusContext } from './providers/ReadingStatusProvider';
import { useTouchHander } from './utils/hooks';

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

function App() {
  const { darkMode } = useDarkModeContext();
  const { feedView, articleView } = useReadingStatusContext();
  useTouchHander();

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
      </div>
    </div>
  );
}

export default App;
