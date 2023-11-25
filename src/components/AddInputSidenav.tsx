import Icon from './Icon';

export default function AddInputSidenav() {
  return (
    <div class="flex flex-col gap-4 rounded bg-gray-100 p-3 shadow-md dark:bg-slate-500">
      <div class="cursor-grab rounded bg-gray-300 p-3 hover:bg-indigo-500 hover:fill-white dark:bg-slate-700 dark:fill-emerald-50 dark:hover:bg-emerald-500">
        <Icon icon="InputText" height="1.5rem" />
      </div>
      <div class="cursor-grab rounded bg-gray-300 p-3 hover:bg-indigo-500 hover:fill-white dark:bg-slate-700 dark:fill-emerald-50 dark:hover:bg-emerald-500">
        <Icon icon="InputNumber" height="1.5rem" />
      </div>
      <div class="cursor-grab rounded bg-gray-300 p-3 hover:bg-indigo-500 hover:fill-white dark:bg-slate-700 dark:fill-emerald-50 dark:hover:bg-emerald-500">
        <Icon icon="InputEmail" height="1.5rem" />
      </div>
    </div>
  );
}
