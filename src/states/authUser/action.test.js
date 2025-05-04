import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

/**
 * test scenario for asyncSetAuthUser thunk
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch showLoading, hideLoading, and action creator when login and getOwnProfile success
 *  - should dispatch showLoading, hideLoading, and call alert when login failed
 *  - should dispatch showLoading, hideLoading, and call alert when getOwnProfile failed
 *
 */

describe('asynSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._getOwnProfile;
  });

  test('should dispatch showLoading, hideLoading, and action creator when login and getOwnProfile success', async () => {
    // arrange
    const dispatch = vi.fn();
    const fakeLoginResponse = {
      email: 'tes123@gmail.com',
      password: 'testestes',
    };
    const fakeAuthUserResponse = {
      id: '123456',
      name: 'Tes',
      email: 'tes123@gmail.com',
      avatar: 'tes.png',
    };
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    // action
    await asyncSetAuthUser(fakeLoginResponse)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch showLoading, hideLoading, and call alert when login failed', async () => {
    // arrange
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const fakeLoginResponse = {
      email: 'tes123@gmail.com',
      password: 'testestes',
    };
    const fakeErrorResponse = new Error('Ups, something went wrong.');
    api.login = () => Promise.reject(fakeErrorResponse);

    // action
    await asyncSetAuthUser(fakeLoginResponse)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch showLoading, hideLoading, and call alert when getOwnProfile failed', async () => {
    // arrange
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const fakeLoginResponse = {
      email: 'tes123@gmail.com',
      password: 'testestes',
    };
    const fakeErrorResponse = new Error('Ups, something went wrong.');
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    // action
    await asyncSetAuthUser(fakeLoginResponse)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

/**
 * test scenario for asyncUnsetAuthUser thunk
 *
 * - asyncUnsetAuthUser thunk
 *  - should dispatch showLoading, hideLoading, and action creator
 *
 */

describe('asynUnsetAuthUser thunk', () => {
  test('should dispatch showLoading, hideLoading, and action creator', () => {
    // arrange
    const dispatch = vi.fn();

    // action
    asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
