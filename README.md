# use-dispatcher

[![NPM version](https://badgen.net/npm/v/use-dispatcher)](https://www.npmjs.com/package/use-dispatcher)
[![License](https://badgen.net/npm/license/use-dispatcher)](https://www.npmjs.com/package/use-dispatcher)

An easy-to-use "typescript friendly" hook for dispatching in react/redux.

> Note: this package can be used with or without typescript!

## Installation

Install with [npm](https://www.npmjs.com/):

```bash
npm i use-dispatcher
```

or [yarn](https://yarnpkg.com/):

```bash
yarn add use-dispatcher
```

## Basic Usage:

You can both pass in an action-creator function or a fixed action to `useDispatcher` function, and it will return a function which can be called to dispatch that action.

```TSX

import { useDispatcher } from "use-dispatcher"

const MyComponent: FunctionComponent = (props) => {

    const dispatchIncrement = useDispatcher({ type: "INCREMENT_COUNTER" });

    return (<div>
        <button onClick={dispatchIncrement}>Increment</button>
    </div>)
}

```

`dispatchIncrement` here is a `void` function with no parameters.

This hook internally uses `useDispatch()` hook and calls `dispatch` function with your action as it is provided.

Alternatively, you can pass in a function which returns an action (A.K.A an action creator).

```TSX

const addCounter = (value: number) => {
  return {
    type: 'ADD_COUNTER',
    value: value,
  };
};

const MyComponent: FunctionComponent = (props) => {

    const dispatchAdd = useDispatcher(addCounter);

    return (<div>
        <button onClick={() => dispatchAdd(10)}>Add 10</button>
    </div>)
}

```

When an action-creator is passed in, the return function will become a function which receives the exact parameters as that action-creator (this is totally recognized by typescript compiler).

## Memoization

Internally, useDispatcher hook calls [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) for the returned function so it can be safely passed down the sub-components with no worries about unwanted re-renders.

But what if you want the function to change? For example you are passing a fixed action which uses some props? So every time that prop is changed, we expect the new behavior from the dispatcher!

```TSX

const MyComponent: FunctionComponent = (props) => {

    const dispatchAdd = useDispatcher(
        {
            type: 'ADD_COUNTER',
            value: props.addValue,
        },
        [props.addValue] // Dependency List
    );

    return (<div>
        <button onClick={dispatchAdd}>Add {props.addValue}</button>
    </div>)
}
```
