import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputPassword from './InputPassword';
import useInput from '../hooks/useInput';

/**
 * test scenario for InputPassword component
 *
 * - InputPassword component
 *  - should handle password typing correctly
 *
 */

function InputPasswordWrapper() {
  const [password, onPasswordChange] = useInput('');
  return <InputPassword password={password} onPasswordChange={onPasswordChange} />;
}

describe('InputPassword component', () => {
  test('should handle password typing correctly', async () => {
    // arrange
    render(<InputPasswordWrapper />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'testestes');

    // assert
    expect(passwordInput).toHaveValue('testestes');
  });
});
