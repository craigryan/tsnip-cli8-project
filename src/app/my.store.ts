// Store class code
export interface IMyState {
  loading: boolean,
  error: boolean,
  myForm: MyForm
}

export const MY_INITIAL_STATE: IMyState = {
  loading: false,
  error: false,
  myForm: {
    total: 0
  }
}

export interface MyForm {
  total: number;
}
