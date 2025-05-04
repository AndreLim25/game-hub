import { describe, test, expect } from 'vitest';
import isPreloadReducer from './reducer';

/**
 * test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *  - should return the initial state when the type of action is UNKNOWN
 *  - should return isPreload status when the type of action is SET_IS_PRELOAD
 *
 */

describe('isPreloadReducer function', () => {
  test('should return the initial state when the type of action is UNKNOWN', () => {
    // arrange
    const initialState = true;
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  test('should return isPreload status when the type of action is SET_IS_PRELOAD', () => {
    // arrange
    const initialState = true;
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        isPreload: false,
      },
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.isPreload);
  });
});
