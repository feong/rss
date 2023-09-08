import dayjs from 'dayjs';
import { Article } from '../../utils/storage';

require('dayjs/locale/zh-cn');

interface Props {
  items: Article[];
  onClick: (guid: string) => void;
}

export default function FeedList(props: Props) {
  dayjs.locale('zh-cn');
  return (
    <>
      {/*<!-- Component: Leading Image One Line List --> */}
      <ul className="divide-y divide-slate-100">
        {props.items.map((item) => (
          <li
            key={item.guid}
            className="flex items-center gap-4 px-4 py-3 cursor-pointer optimize-list-row"
            onClick={() => props.onClick(item.guid)}
          >
            {item.thumbnail !== '' && (
              <div className="flex items-center self-center">
                <img
                  src={item.thumbnail}
                  className="w-12 h-8 rounded object-cover"
                />
              </div>
            )}

            <div className="flex min-h-[2rem] min-w-0 flex-1 flex-col items-start justify-center gap-0">
              <h4
                className={`w-full truncate text-base font-bold ${
                  item.read ? 'opacity-30' : ''
                }`}
              >
                {item.title}
              </h4>
              <p className="w-full truncate text-sm text-slate-500 ">
                {dayjs(item.pubDate).format('MMMDD YYYY, HH:mm')}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {/*<!-- End Leading Image One Line List --> */}
    </>
  );
}
