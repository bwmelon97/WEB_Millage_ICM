import {createReducer} from 'typesafe-actions';

import {DMAction, DMState} from './types';
import {
  GET_MESSAGEBOX_LIST,
  GET_MESSAGEBOX_LIST_SUCCESS,
  GET_MESSAGEBOX_LIST_FAIL,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  SET_MESSAGES_AS_READ,
  DELETE_MESSAGES_REQUEST,
  DELETE_MESSAGES_SUCCESS,
  DELETE_MESSAGES_FAIL,
} from './actions';

const initialState: DMState = {
  result: '',
  message: '',
  messageboxes: [],
  messages: [],
};

const DMReducer = createReducer<DMState, DMAction>(initialState, {
  [GET_MESSAGEBOX_LIST]: (state, action) => ({
    ...state,
  }),
  [GET_MESSAGEBOX_LIST_SUCCESS]: (state, action) => ({
    ...state,
    messageboxes: action.payload.messageboxes,
  }),
  [GET_MESSAGEBOX_LIST_FAIL]: (state, action) => ({
    ...state,
    result: action.payload.result,
    message: action.payload.message,
  }),
  [GET_MESSAGES_REQUEST]: (state, action) => ({
    ...state,
  }),
  [GET_MESSAGES_SUCCESS]: (state, action) => ({
    ...state,
    result: action.payload.result,
    messages: action.payload.messages,
  }),
  [GET_MESSAGES_FAIL]: (state, action) => ({
    ...state,
    result: action.payload.result,
    message: action.payload.message,
  }),
  [SET_MESSAGES_AS_READ]: (state, action) => ({
    ...state,
  }),
  [DELETE_MESSAGES_REQUEST]: (state, action) => ({
    ...state,
  }),
  [DELETE_MESSAGES_SUCCESS]: (state, action) => ({
    ...state,
    messages: [],
  }),
  [DELETE_MESSAGES_FAIL]: (state, action) => ({
    ...state,
  }),
});

export default DMReducer;
