import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

const IconButton = (props: PropsWithChildren<ButtonHTMLAttributes<any>>) => {
  return (
    <button
      {...props}
      onClick={(e) => {
        e.currentTarget.blur();
        props.onClick?.(e);
      }}
      className={
        (props.className ?? '') +
        ' text-2xl hover:bg-slate-900 p-1 rounded-full'
      }
    />
  );
};

export default IconButton;
