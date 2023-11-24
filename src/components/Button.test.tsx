import { getByTestId } from '@testing-library/dom';
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
    expect(getByTestId(document.body, 'button').type).toEqual('submit');
  });
});
