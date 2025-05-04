import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputEmail from './InputEmail';
import useInput from '../hooks/useInput';

/**
 * test scenario for InputEmail component
 *
 * - InputEmail component
 *  - should handle email typing correctly
 *
 */

function InputEmailWrapper() {
  const [email, onEmailChange] = useInput('');
  return <InputEmail email={email} onEmailChange={onEmailChange} />;
}

describe('InputEmail component', () => {
  test('should handle email typing correctly', async () => {
    // arrange
    render(<InputEmailWrapper />);
    const emailInput = screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'tes123@gmail.com');

    // assert
    expect(emailInput).toHaveValue('tes123@gmail.com');
  });
});
