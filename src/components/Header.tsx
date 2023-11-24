import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  return (
    <header className="flex items-center bg-indigo-600 px-5 py-2 text-emerald-50 dark:bg-slate-800">
      <a className="flex-1 text-3xl font-bold" href="/">
        Custom Form Builder
      </a>
      <DarkModeToggle />
    </header>
  );
}
