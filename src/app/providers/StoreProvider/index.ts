import type {
  StateSchema,
  ReduxStoreWithManager,
  ThunkConfig,
} from "./config/StateSchema";
import { createReduxStore, AppDispatch } from "./config/store";
import { StoreProvider } from "./ui/StoreProvider";

export { StoreProvider, createReduxStore };

export type { AppDispatch, StateSchema, ThunkConfig };
