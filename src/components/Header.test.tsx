import { describe, test, expect } from 'bun:test';
import Header from './Header';

describe('Header', () => {
  test('should match snapshot', () => {
    expect(<Header />).toMatchSnapshot();
  });
});
