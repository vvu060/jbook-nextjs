import produce from 'immer';

import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
  [key: string]: {
    loading: boolean;
    content: string;
    err: string;
  };
}

export const initialState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        return state;

      case ActionType.BUNDLE_COMPLETE:
        return state;

      default:
        return state;
    }
  },
);

export default reducer;
