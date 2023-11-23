import clsx from "clsx";

type Props = {
  inputClasses?: string;
  label?: string;
  name: string;
  error?: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "textarea";
  value?: string;
};

export default function Input(props: Props) {
  const inputProps = {
    name: props.name,
    autofocus: props.error,
    class: clsx(
      "text-black border-2 dark:focus:border-emerald-500 p-2 rounded outline-none dark:bg-slate-200",
      props.inputClasses,
      {
        "border-red-400 focus:border-red-600 dark:focus:border-red-600":
          props.error,
      }
    ),
    required: props.required,
  };

  return (
    <Html.Fragment>
      {props.label && <label for={props.name}>{props.label}</label>}
      {props.type === "textarea" ? (
        <textarea {...inputProps}>{props.value}</textarea>
      ) : (
        <input type="text" {...inputProps} value={props.value} />
      )}
      {props.error && <p class="text-red-400">{props.error}</p>}
    </Html.Fragment>
  );
}
