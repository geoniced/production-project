import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchemaKey } from '@/app/providers/StoreProvider/config/StateSchema';

export type ReducersMap = {
  [name in StateSchemaKey]?: Reducer;
}

export interface DynamicModuleLoaderProps {
  reducers: ReducersMap;
  removeAfterUnmount?: boolean;
}

export const useDynamicModuleLoader = ({ reducers, removeAfterUnmount = true }: DynamicModuleLoaderProps) => {
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
