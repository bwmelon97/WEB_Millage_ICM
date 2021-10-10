import {createReducer} from 'typesafe-actions';
import {UserAction, UserState} from './types';
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CHECK_SESSION_REQUEST,
  CHECK_SESSION_SUCCESS,
  CHECK_SESSION_FAIL,
  UPDATE_UNREAD_REQUEST,
  UPDATE_UNREAD_SUCCESS,
  UPDATE_UNREAD_FAIL,
  LOGOUT,
  VALIDATE_USER_REQUEST,
  VALIDATE_USER_SUCCESS,
  VALIDATE_USER_FAIL,
} from './actions';

const initialState: UserState = {
  result: '',
  session: {
    id: 0,
    username: '',
    email: '',
    fullname: '',
    nickname: '',
    phonenumber: '',
    unit: {
      id: 0,
      name: '',
    },
    role: {
      id: -1,
      name: '',
    },
  },
  unread: 0,
  socket: undefined,
  validate: '',
};

const UserReducer = createReducer<UserState, UserAction>(initialState, {
  [CREATE_USER_REQUEST]: (state, action) => (
    initialState
  ),
  [CREATE_USER_SUCCESS]: (state, action) => ({
    ...state,
    result: action.payload.result,
  }),
  [CREATE_USER_FAIL]: (state, action) => ({
    ...state,
    result: action.payload.result,
    message: action.payload.message,
  }),
  [LOGIN_USER_REQUEST]: (state, action) => ({
    ...state,
  }),
  [LOGIN_USER_SUCCESS]: (state, action) => ({
    ...state,
    result: action.payload.result,
  }),
  [LOGIN_USER_FAIL]: (state, action) => ({
    ...state,
    result: action.payload.result,
  }),
  [CHECK_SESSION_REQUEST]: (state, action) => ({
    ...state,
  }),
  [CHECK_SESSION_SUCCESS]: (state, action) => ({
    ...state,
    result: action.payload.result,
    session: action.payload.session,
  }),
  [CHECK_SESSION_FAIL]: (state, action) => ({
    ...state,
    result: action.payload.result,
  }),
  [UPDATE_UNREAD_REQUEST]: (state, action) => ({
    ...state,
  }),
  [UPDATE_UNREAD_SUCCESS]: (state, action) => ({
    ...state,
    unread: action.payload.unread,
  }),
  [UPDATE_UNREAD_FAIL]: (state, action) => ({
    ...state,
    result: action.payload.result,
  }),
  [LOGOUT]: (state, action) => (
    initialState
  ),
  [VALIDATE_USER_REQUEST]: (state, action) => ({
    ...state,
  }),
  [VALIDATE_USER_SUCCESS]: (state, action) => ({
    ...state,
    validate: action.payload.message,
  }),
  [VALIDATE_USER_FAIL]: (state, action) => ({
    ...state,
    validate: action.payload.message,
  }),
});

export default UserReducer;
