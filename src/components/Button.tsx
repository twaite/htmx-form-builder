import clsx from "clsx";

type Props = {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
};

export default function Button(props: Html.PropsWithChildren<Props>) {
  return (
    <button
      // Forward other props so htmx works
      {...props}
      class={clsx("rounded py-2 mt-2", {
        "text-white dark:text-slate-800 bg-indigo-600 dark:bg-emerald-500 ":
          !props.variant || props.variant === "primary",
        "bg-gray-300 dark:bg-emerald-300 dark:text-slate-800":
          props.variant === "secondary",
      })}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
