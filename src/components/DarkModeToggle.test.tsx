import { describe, test, expect } from 'bun:test';
import DarkModeToggle from './DarkModeToggle';

describe('DarkModeToggle', () => {
  test('should match snapshot', () => {
    expect(<DarkModeToggle />).toMatchSnapshot();
  });

  test('should toggle dark mode when pressed', async () => {
    document.body.innerHTML = <DarkModeToggle />;
    const button = document.querySelector('div');

    button.click();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
