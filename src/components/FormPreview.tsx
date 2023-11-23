import { Form } from "app/models";
import Button from "components/Button";
import Input from "components/Input";

type Props = {
  form: Form;
};

export default function FormPreview(props: Props) {
  return (
    <form id={props.form.id} class="flex flex-col">
      <h1 class="text-2xl font-bold">{props.form.name}</h1>
      <div class="flex justify-end">
        <Button>Submit</Button>
      </div>
    </form>
  );
}
