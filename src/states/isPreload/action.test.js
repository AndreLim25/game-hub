import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';

/**
 * test scenario for asyncPreloadProcess thunk
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch showLoading, hideLoading, and action creator when getOwnProfile success
 *  - should dispatch showLoading, hideLoading, and call console.log when getOwnProfile failed
 *
 */

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;

    delete api._getOwnProfile;
  });

  test('should dispatch showLoading, hideLoading, and action creator when getOwnProfile success', async () => {
    // arrange
    const dispatch = vi.fn();
    const fakeAuthUserResponse = {
      id: '123456',
      name: 'Tes',
      email: 'tes123@gmail.com',
      avatar: 'tes.png',
    };
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch showLoading, hideLoading, and call console.log when getOwnProfile failed', async () => {
    // arrange
    const dispatch = vi.fn();
    window.console.log = vi.fn();
    const fakeErrorResponse = new Error('Ups, something went wrong.');
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.console.log).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
