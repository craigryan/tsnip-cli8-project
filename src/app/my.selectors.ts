import { createFeatureSelector, createSelector } from '@ngrx/store';

import {IMyState, MyForm} from './my.store';

const getMyState = createFeatureSelector<IMyState>(
  'my'
);

export const getMyForm = createSelector(
  getMyState,
  (state: IMyState): MyForm => {
    return state.myForm;
  }
);
