import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import peopleReducer, { PeopleReducerTypes } from './reducers/peopleReducer';
import loadingReducer from './reducers/loadingReducer';

export interface StateTypes {
  people: PeopleReducerTypes;
  loading: boolean;
}

const rootReducer = combineReducers<StateTypes>({
  people: peopleReducer,
  loading: loadingReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
