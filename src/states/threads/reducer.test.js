import { describe, test, expect } from 'vitest';
import threadsReducer from './reducer';

/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when the type of action is UNKNOWN
 *  - should return the threads when the type of action is RECEIVE_THREADS
 *  - should return threads with the new thread when the type of action is ADD_THREAD
 *  - should return threads with the toggled up vote thread when the type of action is TOGGLE_UP_VOTE_THREAD
 *  - should return threads with the toggled down vote thread when the type of action is TOGGLE_DOWN_VOTE_THREAD
 *
 */

describe('threadsReducer function', () => {
  test('should return the initial state when the type of action is UNKNOWN', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  test('should return the threads when the type of action is RECEIVE_THREADS', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: '123456',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  test('should return threads with the new thread when the type of action is ADD_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: '123456',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  test('should return threads with the toggled up vote thread when the type of action is TOGGLE_UP_VOTE_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: '123456',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'TOGGLE_UP_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    // action : up vote thread
    const nextState = threadsReducer(initialState, action);

    // assert : up vote thread
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);

    // action : undo up vote thread
    const nextState2 = threadsReducer(nextState, action);

    // assert : undo up vote thread
    expect(nextState2).toEqual(initialState);
  });

  test('should return threads with the toggled down vote thread when the type of action is TOGGLE_DOWN_VOTE_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: '123456',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'TOGGLE_DOWN_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    // action : down vote thread
    const nextState = threadsReducer(initialState, action);

    // assert : down vote thread
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);

    // action : undo down vote thread
    const nextState2 = threadsReducer(nextState, action);

    // assert : undo down vote thread
    expect(nextState2).toEqual(initialState);
  });
});
