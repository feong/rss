import { useKeyPress } from 'ahooks';
import { trim } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
// import useTheme from "../../../../hooks/useTheme"

interface Props {
  isShowing: boolean;
  setIsShowing: (isShowing: boolean) => void;
  onSubmit: (value: string) => void;
}

export default function ModalForm(props: Props) {
  const { isShowing, setIsShowing, onSubmit } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current?.contains(event.target)) {
        setIsShowing(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    let html = document.querySelector('html');

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = 'hidden';

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const modal = document.querySelector('#modal'); // select the modal by it's id

        const firstFocusableElement =
          modal!.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal

        const focusableContent = modal!.querySelectorAll(focusableElements);

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener('keydown', function (e) {
          if (e.keyCode === 27) {
            setIsShowing(false);
          }

          let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              (lastFocusableElement as any).focus(); // add focus for the last focusable element
              e.preventDefault();
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              (firstFocusableElement as any).focus(); // add focus for the first focusable element
              e.preventDefault();
            }
          }
        });

        (firstFocusableElement as any).focus();
      } else {
        html.style.overflowY = 'visible';
      }
    }
  }, [isShowing]);

  const submit = useCallback(() => {
    const input = document.getElementById('id-b03') as HTMLInputElement;
    if (input.value == null || trim(input.value) === '') {
    } else if (input.value.startsWith('http')) {
      props.onSubmit(input.value);
    } else {
      alert('不是个合法的地址');
    }
  }, [props.onSubmit]);

  useKeyPress('enter', submit);

  return isShowing && typeof document !== 'undefined'
    ? ReactDOM.createPortal(
        <div
          className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
          aria-labelledby="header-4a content-4a"
          aria-modal="true"
          tabIndex={-1}
          role="dialog"
        >
          {/*    <!-- Modal --> */}
          <div
            ref={wrapperRef}
            className="flex max-h-[90vh] w-full max-w-md flex-col gap-4 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
            id="modal"
            role="document"
          >
            {/*        <!-- Modal header --> */}

            {/*        <!-- Modal body --> */}
            <div id="content-4a" className="flex-1">
              <div className="flex flex-col gap-6">
                {/*                <!-- Input field --> */}
                <div className="relative">
                  <input
                    id="id-b03"
                    type="url"
                    name="id-b03"
                    placeholder="your name"
                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                  <label
                    htmlFor="id-b03"
                    className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                  >
                    添加RSS源
                  </label>
                </div>
              </div>
            </div>
            {/*        <!-- Modal actions --> */}
            <div className="flex justify-center gap-2">
              <button
                className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                onClick={submit}
              >
                <span>确定</span>
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
}
