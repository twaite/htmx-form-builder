import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="flex dark:bg-slate-800 bg-indigo-600 py-2 px-5 items-center text-emerald-50">
      <a className="flex-1 text-3xl font-bold" href="/">
        Custom Form Builder
      </a>
      <DarkModeToggle />
    </header>
  );
}
