import { Action } from '@ngrx/store';

// Action class code
export namespace MyActions {
  export enum Types {
    SetMyFormValue = '[Secret] Set My Form Value'
  }

  export class SetMyFormValue implements Action {
    readonly type = Types.SetMyFormValue;
    constructor(public payload: any) {}
  }
}
