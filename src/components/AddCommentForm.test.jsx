import { describe, test, expect, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddCommentForm from './AddCommentForm';

/**
 * test scenario for AddCommentForm component
 *
 * - AddCommentForm component
 *  - should handle comment typing correctly
 *  - should call addComment function when send button is clicked
 *  - should reset comment input when send button is clicked
 *
 */

describe('AddCommentForm component', () => {
  afterEach(() => {
    cleanup();
  });

  test('should handle comment typing correctly', async () => {
    // arrange
    render(<AddCommentForm addComment={() => {}} />);
    const commentInput = screen.getByPlaceholderText('Type your comment here');

    // action
    await userEvent.type(commentInput, 'Ini adalah komentar');

    // assert
    expect(commentInput).toHaveValue('Ini adalah komentar');
  });

  test('should call addComment function when send button is clicked', async () => {
    // arrange
    const mockAddComment = vi.fn();
    render(<AddCommentForm addComment={mockAddComment} />);
    const commentInput = screen.getByPlaceholderText('Type your comment here');
    await userEvent.type(commentInput, 'Ini adalah komentar');
    const sendButton = screen.getByRole('button');

    // action
    await userEvent.click(sendButton);

    // assert
    expect(mockAddComment).toHaveBeenCalledWith({
      content: 'Ini adalah komentar',
    });
  });

  test('should reset comment input when send button is clicked', async () => {
    // arrange
    render(<AddCommentForm addComment={() => {}} />);
    const commentInput = screen.getByPlaceholderText('Type your comment here');
    await userEvent.type(commentInput, 'Ini adalah komentar');
    const sendButton = screen.getByRole('button');

    // action
    await userEvent.click(sendButton);

    // assert
    expect(commentInput).toHaveValue('');
  });
});
