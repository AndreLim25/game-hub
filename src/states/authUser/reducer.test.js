import { describe, test, expect } from 'vitest';
import authUserReducer from './reducer';

/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when the type of action is UNKNOWN
 *  - should return the authUser when the type of action is SET_AUTH_USER
 *  - should return null when the type of action is UNSET_AUTH_USER
 *
 */

describe('authUserReducer function', () => {
  test('should return the initial state when the type of action is UNKNOWN', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  test('should return the authUser when the type of action is SET_AUTH_USER', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: {
          id: '123456',
          name: 'Tes',
          email: 'tes123@gmail.com',
          avatar: 'tes.png',
        },
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  test('should return null when the type of action is UNSET_AUTH_USER', () => {
    // arrange
    const initialState = {
      id: '123456',
      name: 'Tes',
      email: 'tes123@gmail.com',
      avatar: 'tes.png',
    };
    const action = {
      type: 'UNSET_AUTH_USER',
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});
