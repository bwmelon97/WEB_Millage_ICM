import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import DMReducer from './DM/reducer';
import BoardReducer from './board/reducer';
import UnitReducer from './Unit/reducer';
import UserReducer from './User/reducer';
import ScheduleReducer from './Schedule/reducer';
import {
  getMessageBoxListSagaListener,
  getMessagesSagaListener,
} from './DM/sagas';
import boardSaga from './board/sagas';
import scheduleSaga from './Schedule/sagas';
import {
  checkSessionListener,
  createUserSagaListener,
  loginSagaListener,
  updateUnreadListener,
} from './User/sagas';
import {
  getUnitListSagaListener,
} from './Unit/sagas';


const rootReducer = combineReducers({
  DM: DMReducer,
  user: UserReducer,
  Board: BoardReducer,
  unit: UnitReducer,
  schedule: ScheduleReducer,
});

export default rootReducer;

export function* rootSaga() {
  yield all([
    getMessageBoxListSagaListener(),
    getMessagesSagaListener(),
    createUserSagaListener(),
    loginSagaListener(),
    checkSessionListener(),
    boardSaga(),
    getUnitListSagaListener(),
    scheduleSaga(),
    updateUnreadListener(),
  ]);
}

export type RootState = ReturnType<typeof rootReducer>
