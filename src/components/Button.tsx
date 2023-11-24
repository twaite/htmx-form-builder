import clsx from 'clsx';
import { Html } from '@elysiajs/html';

type Props = {
  class?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
};

export default function Button(props: Html.PropsWithChildren<Props>) {
  return (
    <button
      data-testid="button"
      // Forward other props so htmx works
      {...props}
      class={clsx(
        'rounded px-3 py-2',
        {
          'bg-indigo-600 text-white dark:bg-emerald-500 ':
            !props.variant || props.variant === 'primary',
          'bg-gray-300 dark:bg-emerald-300 dark:text-slate-800':
            props.variant === 'secondary',
        },
        props.class,
      )}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
