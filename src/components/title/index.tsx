import { useKeyPress } from 'ahooks';
import { useState } from 'react';
import { TbArrowLeft, TbScriptPlus } from 'react-icons/tb';
import DarkMode from '../../pages/source/components/DarkMode';
import { useReadingStatusContext } from '../../providers/ReadingStatusProvider';
import { useCurrentSources } from '../../utils/hooks';
import IconButton from '../button/IconButton';
import ModalForm from '../modal';

const BackButton = () => {
  const { sourceView, back } = useReadingStatusContext();

  useKeyPress('b', back);

  if (sourceView) {
    return <div />;
  }

  return (
    <IconButton onClick={back} id="title-button">
      <TbArrowLeft />
    </IconButton>
  );
};

const AddButton = () => {
  const [isShowing, setIsShowing] = useState(false);
  const { setSource } = useReadingStatusContext();

  return (
    <IconButton>
      <TbScriptPlus onClick={() => setIsShowing(true)} />
      <ModalForm
        isShowing={isShowing}
        setIsShowing={setIsShowing}
        onSubmit={(url) => {
          setIsShowing(false);
          setSource(url);
        }}
      />
    </IconButton>
  );
};

const Title = () => {
  const { current } = useCurrentSources();
  const { sourceView } = useReadingStatusContext();

  return (
    <div id="title" className="flex items-center justify-between px-2 gap-2">
      <BackButton />
      <label>{current?.title ?? '轻阅读'}</label>
      <div id="title-button" className="flex items-center gap-2">
        {sourceView && <AddButton />}
        <DarkMode />
      </div>
    </div>
  );
};

export default Title;
