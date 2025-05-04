import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import LeaderboardItem from './LeaderboardItem';

/**
 * test scenario for LeaderboardItem component
 *
 * - LeaderboardItem component
 *  - should display rank, avatar, name, score correctly
 *
 */

describe('LeaderboardItem component', () => {
  test('should display rank, avatar, name, score correctly', () => {
    // arrange
    const index = 0;
    const leaderboard = {
      user: {
        id: '123456',
        name: 'Tes',
        avatar: 'tes.png',
      },
      score: 20,
    };

    render(
      <LeaderboardItem
        key={leaderboard.user.id}
        rank={index + 1}
        {...leaderboard.user}
        score={leaderboard.score}
      />
    );

    const rank = screen.getByText(/1/);
    const image = screen.getByRole('img');
    const name = screen.getByText(/Tes/);
    const score = screen.getByText(/20/);

    // assert
    expect(rank).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'tes.png');
    expect(image).toHaveAttribute('alt', "Tes's profile");
    expect(name).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  });
});
