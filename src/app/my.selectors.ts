import { createFeatureSelector, createSelector } from '@ngrx/store';

import {IMyState, MyForm} from './my.store';

const getMyState = createFeatureSelector<IMyState>(
  'my'
);

export const getTotal = createSelector(
  getMyState,
  (state: MyForm): number => {
    return state.total;
  }
);
