import { useState } from 'react';
import { TbTrash } from 'react-icons/tb';
import { useReadingStatusContext } from '../../providers/ReadingStatusProvider';
import { useCurrentSources } from '../../utils/hooks';
import { delSource, useUnreadArticles } from '../../utils/storage';
import ModalIconActionButtons from '../modal/Confirm';

const DeleteButton = (props: { source: string }) => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <>
      <div
        className="p-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsShowing(true);
        }}
      >
        <TbTrash />
      </div>
      <ModalIconActionButtons
        isShowing={isShowing}
        setIsShowing={setIsShowing}
        onOk={() => {
          delSource(props.source);
          setIsShowing(false);
        }}
      />
    </>
  );
};

export default function List() {
  const { sources } = useCurrentSources();
  const { setSource } = useReadingStatusContext();
  const groups = useUnreadArticles();

  return (
    <>
      {/*<!-- Component: One Line List With Trailing Badge And Leading Avatar --> */}
      <ul className="divide-y divide-slate-100">
        {sources.map((item) => (
          <li
            key={item.source}
            className="flex items-center gap-4 px-4 py-3  cursor-pointer"
            onClick={() => setSource(item.source)}
          >
            <div className="self-start w-7 h-7 bg-blue-500 rounded-full flex justify-center items-center">
              {item.title.substring(0, 1)}
            </div>
            <div className="flex min-h-[2rem] flex-1 flex-col items-start justify-center gap-0 overflow-hidden">
              <h4 className="w-full truncate text-base ">{item.title}</h4>
            </div>
            <DeleteButton source={item.source} />
            {groups[item.source] && (
              <span className="inline-flex items-center justify-center rounded-full bg-pink-500 px-1.5 text-xs text-white">
                {groups[item.source].length}
              </span>
            )}
          </li>
        ))}
      </ul>
      {/*<!-- End One Line List With Trailing Badge And Leading Avatar --> */}
    </>
  );
}
