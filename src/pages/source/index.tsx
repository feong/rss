import { useState } from 'react';
import { TbScriptPlus } from 'react-icons/tb';
import IconButton from '../../components/button/IconButton';
import Card from '../../components/card';
import List from '../../components/list';
import ModalForm from '../../components/modal';
import { useReadingStatusContext } from '../../providers/ReadingStatusProvider';

type Props = {};

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

const Source = (props: Props) => {
  return (
    <div className=" h-full p-1 flex flex-col">
      <Card className="!p-0 flex-auto scroll-y-overlay dark:[color-scheme:dark]">
        <List />
      </Card>
    </div>
  );
};

export default Source;
