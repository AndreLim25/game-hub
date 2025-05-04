import { describe, test, expect } from 'vitest';
import leaderboardReducer from './reducer';

/**
 * test scenario for leaderboardReducer
 *
 * - leaderboardReducer function
 *  - should return the initial state when the type of action is UNKNOWN
 *  - should return the leaderboard when the type of action is GET_LEADERBOARD
 *
 */

describe('leaderboardReducer function', () => {
  test('should return the initial state when the type of action is UNKNOWN', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  test('should return the leaderboard when the type of action is GET_LEADERBOARD', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'GET_LEADERBOARD',
      payload: {
        leaderboard: [
          {
            user: {
              id: '123456',
              name: 'Tes',
              email: 'tes123@gmail.com',
              avatar: 'tes.png',
            },
            score: 0,
          },
        ],
      },
    };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboard);
  });
});
