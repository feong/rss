import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export default function Button(
  props: PropsWithChildren<ButtonHTMLAttributes<any>>,
) {
  return (
    <button
      {...props}
      onClick={(e) => {
        e.currentTarget.blur();
        props.onClick?.(e);
      }}
      className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none"
    />
  );
}
