import { useEffect } from "react";
import { Reducer } from "@reduxjs/toolkit";
import { useDispatch, useStore } from "react-redux";

import {
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
} from "@/app/providers/StoreProvider";

export type ReducersMap = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

export interface DynamicModuleLoaderProps {
  reducers: ReducersMap;
  removeAfterUnmount?: boolean;
}

export const useDynamicModuleLoader = ({
  reducers,
  removeAfterUnmount = true,
}: DynamicModuleLoaderProps) => {
  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap();

    Object.entries(reducers).forEach(([stateKey, reducer]) => {
      const mounted = mountedReducers[stateKey as StateSchemaKey];

      // Добавляем новый редьюсер если его нет
      // внутри reducerManager.add есть проверка на это, в данном случае мы лишь не вызовем dispatch
      // при наличии редьюсера в сторе
      if (!mounted) {
        store.reducerManager.add(stateKey as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${stateKey} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([stateKey]) => {
          store.reducerManager.remove(stateKey as StateSchemaKey);
          dispatch({ type: `@DESTROY ${stateKey} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);
};
