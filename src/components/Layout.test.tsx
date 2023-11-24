import { describe, test, expect } from 'bun:test';
import Layout from './Layout';

describe('Layout', () => {
  test('should match snapshot', () => {
    expect(<Layout />).toMatchSnapshot();
  });
});
