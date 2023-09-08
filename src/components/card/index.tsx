import { forwardRef, PropsWithChildren } from 'react';

const Card = forwardRef(
  (props: PropsWithChildren<{ className?: string, tabIndex?: number}>, ref: any) => {
    return (
      <div
        {...props}
        className={`overflow-hidden bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl ${
          props.className ?? ''
        }`}
        ref={ref}
      />
    );
  },
);

export default Card;
