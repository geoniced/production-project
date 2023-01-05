import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersMap = {
  [name in StateSchemaKey]?: Reducer;
}

type ReducersMapEntry = [StateSchemaKey, Reducer];

export interface DynamicModuleLoaderProps {
  reducers: ReducersMap;
  removeAfterUnmount?: boolean;
}

export const useDynamicModuleLoader = ({ reducers, removeAfterUnmount }: DynamicModuleLoaderProps) => {
  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    Object.entries(reducers).forEach(([stateKey, reducer]: ReducersMapEntry) => {
      store.reducerManager.add(stateKey, reducer);
      dispatch({ type: `@INIT ${stateKey} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([stateKey]: ReducersMapEntry) => {
          store.reducerManager.remove(stateKey);
          dispatch({ type: `@DESTROY ${stateKey} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);
};
