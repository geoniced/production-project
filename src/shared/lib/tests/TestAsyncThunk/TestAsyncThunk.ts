import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

type ActionCreatorType<ThunkReturn, Arg, RejectedValue> =
  (arg: Arg) => AsyncThunkAction<ThunkReturn, Arg, { rejectValue: RejectedValue }>

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<ThunkReturn, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>;

  getState: () => StateSchema;

  actionCreator: ActionCreatorType<ThunkReturn, Arg, RejectedValue>;

  api: jest.MockedFunctionDeep<AxiosStatic>;

  navigate: jest.MockedFn<any>;

  constructor(actionCreator: ActionCreatorType<ThunkReturn, Arg, RejectedValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();

    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(
      this.dispatch,
      this.getState,
      { api: this.api, navigate: this.navigate },
    );

    return result;
  }
}
