import { STARTLOADING, FINISHLOADING } from '../../variables/forContacts';

export const actions: ActionTypes = {
  startLoading: () => ({ type: LOADING_ACTIONS.START_LOADING }),
  finishLoading: () => ({ type: LOADING_ACTIONS.FINISH_LOADING }),
};
enum LOADING_ACTIONS {
  START_LOADING = 'START_LOADING',
  FINISH_LOADING = 'FINISH_LOADING',
}

interface ActionTypes {
  startLoading: () => StartLoadingAction;
  finishLoading: () => FinishLoadingAction;
}

interface StartLoadingAction {
  type: LOADING_ACTIONS.START_LOADING;
}

interface FinishLoadingAction {
  type: LOADING_ACTIONS.FINISH_LOADING;
}

const loadingReducer = (state = false, action: StartLoadingAction | FinishLoadingAction): boolean => {
  switch (action.type) {
    case STARTLOADING:
      return true;
    case FINISHLOADING:
      return false;

    default:
      return state;
  }
};

export default loadingReducer;
