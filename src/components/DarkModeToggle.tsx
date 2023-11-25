import { Html } from '@elysiajs/html';
import Icon from 'components/Icon';

export default function DarkModeToggle() {
  return (
    <Html.Fragment>
      <div
        data-testid="dark-mode-toggle"
        class="flex w-10 cursor-pointer justify-center rounded-full bg-indigo-100 p-2 dark:bg-slate-900"
        onclick="document.documentElement.classList.toggle('dark'); localStorage.setItem('theme', localStorage.getItem('theme') === 'light' ? 'dark' : 'light');"
      >
        <Icon
          icon="Moon"
          height="1.5rem"
          class="block rounded fill-indigo-900 dark:hidden"
        />
        <Icon icon="Sun" class="hidden rounded fill-emerald-50 dark:block" />
      </div>
    </Html.Fragment>
  );
}
