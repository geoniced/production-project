import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

type ActionCreatorType<ThunkReturn, Arg, RejectedValue> =
  (arg: Arg) => AsyncThunkAction<ThunkReturn, Arg, { rejectValue: RejectedValue }>

export class TestAsyncThunk<ThunkReturn, Arg, RejectedValue> {
  dispatch: Dispatch;

  getState: () => StateSchema;

  actionCreator: ActionCreatorType<ThunkReturn, Arg, RejectedValue>;

  constructor(actionCreator: ActionCreatorType<ThunkReturn, Arg, RejectedValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, undefined);

    return result;
  }
}
