import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { asyncGetLeaderboard, getLeaderboardActionCreator } from './action';

/**
 * test scenario for asyncGetLeaderboard thunk
 *
 * - asyncGetLeaderboard thunk
 *  - should dispatch showLoading, hideLoading, and action creator when getLeaderboard success
 *  - should dispatch showLoading, hideLoading, and call alert when getLeaderboard failed
 *
 */

describe('asyncGetLeaderboard thunk', () => {
  beforeEach(() => {
    api._getLeaderboard = api.getLeaderboard;
  });

  afterEach(() => {
    api.getLeaderboard = api._getLeaderboard;

    delete api._getLeaderboard;
  });

  test('should dispatch showLoading, hideLoading, and action creator when getLeaderboard success', async () => {
    // arrange
    const dispatch = vi.fn();
    const fakeLeaderboardResponse = [
      {
        user: {
          id: '123456',
          name: 'Tes',
          email: 'tes123@gmail.com',
          avatar: 'tes.png',
        },
        score: 0,
      },
    ];
    api.getLeaderboard = () => Promise.resolve(fakeLeaderboardResponse);

    // action
    await asyncGetLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(getLeaderboardActionCreator(fakeLeaderboardResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch showLoading, hideLoading, and call alert when getLeaderboard failed', async () => {
    // arrange
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const fakeErrorResponse = new Error('Failed to load leaderboard.');
    api.getLeaderboard = () => Promise.reject(fakeErrorResponse);

    // action
    await asyncGetLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
