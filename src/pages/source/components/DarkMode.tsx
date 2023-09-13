import { Transition } from '@headlessui/react';
import { TbMoonStars, TbSunHigh } from 'react-icons/tb';
import { useDarkModeContext } from '../../../providers/GlobalSettingsProvider';

type Props = {};

const DarkMode = (props: Props) => {
  const { darkMode, setDarkMode } = useDarkModeContext();

  return (
    <div
      className="cursor-pointer text-2xl relative w-6 h-6 -scale-y-[1]"
      onClick={() => setDarkMode((pre) => !pre)}
    >
      <Transition
        show={darkMode}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 rotate-[-90deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 rotate-90 "
      >
        <TbMoonStars className="absolute -scale-y-[1]" />
      </Transition>
      <Transition
        show={!darkMode}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 rotate-[-90deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 rotate-90"
      >
        <TbSunHigh className="absolute inset-0 w-6 h-6" />
      </Transition>
    </div>
  );
};

export default DarkMode;
