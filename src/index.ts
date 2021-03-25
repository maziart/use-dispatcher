import { DependencyList, useCallback } from 'react';
import { useDispatch } from 'react-redux';

type Action = { type: any };
type ActionCreator<TAction extends Action> = (...args: any) => TAction;

export function useDispatcher<TAction extends Action>(action: TAction, dependencies?: DependencyList): () => void;

export function useDispatcher<TAction extends Action, TCreator extends ActionCreator<TAction>>(
  actionCreator: TCreator,
  dependencies?: DependencyList,
): (...args: Parameters<TCreator>) => void;

export function useDispatcher<TAction extends Action, TCreator extends ActionCreator<TAction>>(
  actionCreator: TAction | TCreator,
  dependencies: DependencyList = [],
): (...args: Parameters<TCreator>) => void {
  const dispatch = useDispatch();

  return useCallback(
    // tslint:disable-next-line only-arrow-functions
    function () {
      let creator: TCreator;
      if (typeof actionCreator !== 'function') {
        creator = (() => actionCreator) as any;
      } else {
        creator = actionCreator;
      }

      dispatch(creator.call(null, ...arguments));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies,
  );
}
