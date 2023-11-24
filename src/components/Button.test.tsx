import { describe, expect, test } from 'bun:test';
import Button from './Button';

describe('Button', () => {
  test('should render a button', () => {
    expect(Button({ type: 'button' })).toMatchSnapshot();
  });

  test('should render a submit button', () => {
    const button = Button({ type: 'submit' });
    document.body.innerHTML = button;

    expect(button).toMatchSnapshot();
    expect(document.querySelector('button').type).toEqual('submit');
  });
});
